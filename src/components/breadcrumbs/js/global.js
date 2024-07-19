(function () {
    "use strict";

    /**
     * @module breadcrumb
     */

    var breadcrumb = {};
    var originalBreadCrumbUl = null;

    function getTheElements(resized = false) {
        // const banner =
        //     document.querySelector(".qld__banner--breadcrumbs") ||
        //     document.querySelector(".qld__body--breadcrumb");

        // if (document) {
            const bannerBreadCrumbsAll = document.querySelectorAll(
                "nav.qld__banner__breadcrumbs--desktop"
            );
            const bannerBreadCrumbArray = [...bannerBreadCrumbsAll];
            const bannerBreadCrumb = bannerBreadCrumbArray.find(
                (breadcrumb) => {
                    return breadcrumb.offsetWidth > 0;
                }
            );
            
            if(!originalBreadCrumbUl) {
                originalBreadCrumbUl = bannerBreadCrumb.querySelector("ul.qld__link-list").cloneNode(true);
            }

            if(resized) {
                bannerBreadCrumb.querySelector("ul.qld__link-list").innerHTML = originalBreadCrumbUl.innerHTML;
            }

            const breadCrumbsUl = bannerBreadCrumb.querySelector("ul.qld__link-list");

            return {
                bannerBreadCrumb,
                breadCrumbsUl,
            };
        // }

        // return null;
    }

    function createOverFlow() {
        //create the over flow menu here:

        //start wrapper
        const overFlowWrapper = document.createElement("div");
        overFlowWrapper.className = "qld__overflow_menu_wrapper";
        //end wrapper

        //start overflow button
        const button = document.createElement("button");
        button.className =
            "qld__btn qld__btn--toggle qld__overflow_menu__btn qld__accordion--closed";
        button.setAttribute("href", "#");
        button.setAttribute("aria-controls", "overflow-menu--");
        button.setAttribute("aria-expanded", "false");

        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );
        svg.classList.add("qld__icon");
        svg.classList.add("qld__icon--lg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("viewBox", "0 0 448 512");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("focusable", "false");
        svg.setAttribute("width", "24");
        svg.setAttribute("height", "32");
        svg.setAttribute("role", "img");

        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        path.setAttribute("fill", "currentColor");
        path.setAttribute(
            "d",
            "M352 256C352 238.3 366.3 224 384 224C401.7 224 416 238.3 416 256C416 273.7 401.7 288 384 288C366.3 288 352 273.7 352 256zM192 256C192 238.3 206.3 224 224 224C241.7 224 256 238.3 256 256C256 273.7 241.7 288 224 288C206.3 288 192 273.7 192 256zM96 256C96 273.7 81.67 288 64 288C46.33 288 32 273.7 32 256C32 238.3 46.33 224 64 224C81.67 224 96 238.3 96 256z"
        );

        svg.appendChild(path);
        button.appendChild(svg);
        //end overflow button

        overFlowWrapper.appendChild(button);

        // Start menu element
        const div = document.createElement("div");
        div.className = "qld__overflow_menu qld__accordion--closed";
        div.setAttribute("id", "overflow-menu--");

        const ul = document.createElement("ul");
        ul.className = "qld__overflow_menu_list";
        ul.setAttribute("aria-label", "qld__overflow_menu qld__link-columns");

        div.appendChild(ul);
        //end menu

        overFlowWrapper.appendChild(div);

        //This menu does not have the uls , uls are going to be created in insertfunction

        return overFlowWrapper;
    }

    function insertOverFlowButton(overFlowWrapper, element) {
        const newElement = document.createElement("div");
        newElement.className = "qld__overflow_menu_list-item";

        const link = element.querySelector("a");
        link.classList.add("qld__overflow_menu_list-item-link");
        link.setAttribute("tabindex", "0");

        newElement.appendChild(link);

        const ul = overFlowWrapper.querySelector("ul");

        ul.appendChild(newElement);

        return overFlowWrapper;
    }
    
    function appendOverflow( breadCrumbsUlLis, overflowMenu) {
        breadCrumbsUlLis[1].innerHTML = "";
        breadCrumbsUlLis[1].className = "qld__overflow_menu--breadcrumbs";
        breadCrumbsUlLis[1].appendChild(overflowMenu);
        breadCrumbsUlLis[1].style.display = "flex";
    }

    breadcrumb.init = function () {
        if (getTheElements()) {
            const { breadCrumbsUl } = getTheElements();

            const breadCrumbsUlLis = breadCrumbsUl.querySelectorAll("li");
            // if (breadCrumbsUl.offsetHeight > breadCrumbsUlLis[0].offsetHeight && breadCrumbsUlLis.length > 2 && breadCrumbsUlLis[0].offsetHeight > 0) {
            if (breadCrumbsUlLis.length > 2 && breadCrumbsUlLis[0].offsetHeight > 0) {
                const overflowMenu = createOverFlow();
                let breadcrumbLisLength = breadCrumbsUlLis.length;
                let i = 1;
                
                
                if(breadCrumbsUlLis.length > 5) {

                    insertOverFlowButton(overflowMenu, breadCrumbsUlLis[1]);
                    breadCrumbsUlLis[1].style.display = "none";
                    appendOverflow(breadCrumbsUlLis, overflowMenu);
                    i = 2;

                    while(i < breadCrumbsUlLis.length - 1) {
                        insertOverFlowButton(overflowMenu, breadCrumbsUlLis[i]);
                        breadCrumbsUlLis[i].style.display = "none";
                        i++;
                    }

                } else if((breadCrumbsUl.offsetHeight > (breadCrumbsUlLis[0].offsetHeight * 1.9))) {

                    insertOverFlowButton(overflowMenu, breadCrumbsUlLis[1]);
                    breadCrumbsUlLis[1].style.display = "none";
                    appendOverflow(breadCrumbsUlLis, overflowMenu);
                    i = 2;

                    while ( (breadCrumbsUl.offsetHeight > (breadCrumbsUlLis[0].offsetHeight * 1.9)) &&
                    (i < breadcrumbLisLength - 1)
                    ) {

                        insertOverFlowButton(overflowMenu, breadCrumbsUlLis[i]);
                        breadCrumbsUlLis[i].style.display = "none";

                        i++;
                    }
                }
            }
        }
    };

    QLD.breadcrumb = breadcrumb;

    window.addEventListener("DOMContentLoaded", function () {
        QLD.breadcrumb.init();
        QLD.accordion.init();
    });

    window.addEventListener('resize' , function() {
        getTheElements(true);
        QLD.breadcrumb.init();
        QLD.accordion.init();
    });

})();
