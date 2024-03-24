// // Get the dropdown menu element
// var dropdownMenu = document.getElementById("dropdownMenu");

// // Add the click event listener to the dropdown menu
// dropdownMenu.addEventListener("click", function() {
//     document.getElementById("myDropdown").classList.toggle("show");
// });

// // Close the dropdown if the user clicks outside of it
// window.onclick = function(event) {
//     if (!event.target.matches('#dropdownMenu')) {
//         var dropdowns = document.getElementsByClassName("dropdown-content");
//         var i;
//         for (i = 0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('show')) {
//                 openDropdown.classList.remove('show');
//             }
//         }
//     }
// };

//   class ColorSwitcher {
//             constructor() {
//                 this.colorMap = {
//                     blue: { bg: 'blue', text: 'white' },
//                     orange: { bg: 'orange', text: 'black' },
//                     green: { bg: 'green', text: 'white' },
//                     pink: { bg: 'pink', text: 'black' },
//                     grey: { bg: 'grey', text: 'black' }
//                 };
//             }

//             changeColor(color) {
//                 document.documentElement.style.setProperty('--main-bg-color', this.colorMap[color].bg);
//                 document.documentElement.style.setProperty('--main-text-color', this.colorMap[color].text);
//             }
//         }

//         const colorSwitcher = new ColorSwitcher();

//         // Use event delegation to handle color switcher button clicks
//         document.getElementById('color-switchers').addEventListener('click', function(event) {
//             if (event.target.matches('.btn')) {
//                 const color = event.target.classList[1]; // Get the color from the button's class
//                 colorSwitcher.changeColor(color);
//             }
//         });




class ColorSwitcher {
    constructor() {
        this.colorMap = {
            blue: { bg: 'blue', text: 'white', key: 'b' },
            orange: { bg: 'orange', text: 'black', key: 'o' },
            green: { bg: 'green', text: 'white', key: 'g' },
            pink: { bg: 'pink', text: 'black', key: 'p' },
            grey: { bg: 'grey', text: 'black', key: 'r' } // Adding 'r' for grey
            // Add more keys as needed
        };
        this.loadTheme();
        this.setAutomaticColorChange();
        this.setupEventListeners();
    }

    async changeColor(color) {
        document.documentElement.style.setProperty('--main-bg-color', this.colorMap[color].bg);
        document.documentElement.style.setProperty('--main-text-color', this.colorMap[color].text);
        this.saveTheme(color);
    }

    saveTheme(color) {
        localStorage.setItem('themeColor', color);
    }

    loadTheme() {
        const savedColor = localStorage.getItem('themeColor');
        if (savedColor && this.colorMap.hasOwnProperty(savedColor)) {
            this.changeColor(savedColor);
        }
    }

    async setAutomaticColorChange() {
        while (true) {
            await this.delay(1000 * 60 * 60 * 24 * 30); // Wait for one month
            const colors = Object.keys(this.colorMap);
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            await this.changeColor(randomColor);
        }
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setupEventListeners() {
        this.setupColorSwitcher();
        this.setupThemePreviews();
    }

    setupColorSwitcher() {
        document.getElementById('color-switchers').addEventListener('click', async (event) => {
            if (event.target.matches('.btn')) {
                const color = event.target.classList[1];
                await this.changeColor(color);
            }
        });
    }

    setupThemePreviews() {
        const themePreviews = document.querySelectorAll('.theme-preview');
        themePreviews.forEach(preview => {
            preview.addEventListener('click', async (event) => {
                const color = event.target.dataset.color;
                if (color) {
                    await this.changeColor(color);
                }
            });
        });
    }
}

const colorSwitcher = new ColorSwitcher();




        // lazy load animation

        document.addEventListener('DOMContentLoaded', function() {
    // Lazy load options configuration for regular images
    window.lazyLoadOptionsRegular = {
        elements_selector: "img[data-lazy-src], .rocket-lazyload",
        data_src: "lazy-src",
        data_srcset: "lazy-srcset",
        data_sizes: "lazy-sizes",
        class_loading: "lazyloading",
        class_loaded: "lazyloaded",
        threshold: 300,
        callback_loaded: function (element) {
            // Check if lazy loaded element is an iframe and fitvidscompatible
            if (element.tagName === "IFRAME" && element.dataset.rocketLazyload == "fitvidscompatible") {
                // If the iframe is lazyloaded and fitvidscompatible, apply fitVids plugin
                if (element.classList.contains("lazyloaded")) {
                    if (typeof window.jQuery != "undefined") {
                        if (jQuery.fn.fitVids) {
                            jQuery(element).parent().fitVids(); // Apply fitVids plugin to parent element
                        }
                    }
                }
            }
        },
    };

    // Lazy load options configuration for specific type of images (e.g., high resolution)
    window.lazyLoadOptionsSpecific = {
        elements_selector: "img[data-lazy-specific]",
        data_src: "lazy-specific",
        class_loading: "lazyloading",
        class_loaded: "lazyloaded",
        threshold: 300,
    };

    // Lazy load initialization event listener for regular images
    window.addEventListener("LazyLoad::Initialized::Regular", function (e) {
        var lazyLoadInstance = e.detail.instance;
        if (window.MutationObserver) {
            var observer = new MutationObserver(function (mutations) {
                var image_count = 0;
                var iframe_count = 0;
                var rocketlazy_count = 0;
                mutations.forEach(function (mutation) {
                    for (i = 0; i < mutation.addedNodes.length; i++) {
                        if (typeof mutation.addedNodes[i].getElementsByTagName !== "function") {
                            continue;
                        }
                        if (typeof mutation.addedNodes[i].getElementsByClassName !== "function") {
                            continue;
                        }
                        images = mutation.addedNodes[i].getElementsByTagName("img");
                        is_image = mutation.addedNodes[i].tagName == "IMG";
                        iframes = mutation.addedNodes[i].getElementsByTagName("iframe");
                        is_iframe = mutation.addedNodes[i].tagName == "IFRAME";
                        rocket_lazy = mutation.addedNodes[i].getElementsByClassName("rocket-lazyload");
                        image_count += images.length;
                        iframe_count += iframes.length;
                        rocketlazy_count += rocket_lazy.length;
                        if (is_image) {
                            image_count += 1;
                        }
                        if (is_iframe) {
                            iframe_count += 1;
                        }
                    }
                });
                if (image_count > 0 || iframe_count > 0 || rocketlazy_count > 0) {
                    lazyLoadInstance.update(); // Update lazy load instance
                }
            });
            var b = document.getElementsByTagName("body")[0];
            var config = { childList: true, subtree: true }; // Mutation observer configuration
            observer.observe(b, config); // Start observing the body for mutations
        }
    }, false);

    // Lazy load initialization event listener for specific type of images
    window.addEventListener("LazyLoad::Initialized::Specific", function (e) {
        var lazyLoadInstance = e.detail.instance;
        if (window.MutationObserver) {
            var observer = new MutationObserver(function (mutations) {
                var image_count = 0;
                mutations.forEach(function (mutation) {
                    for (i = 0; i < mutation.addedNodes.length; i++) {
                        if (typeof mutation.addedNodes[i].getElementsByTagName !== "function") {
                            continue;
                        }
                        images = mutation.addedNodes[i].getElementsByTagName("img");
                        is_image = mutation.addedNodes[i].tagName == "IMG";
                        image_count += images.length;
                        if (is_image) {
                            image_count += 1;
                        }
                    }
                });
                if (image_count > 0) {
                    lazyLoadInstance.update(); // Update lazy load instance
                }
            });
            var b = document.getElementsByTagName("body")[0];
            var config = { childList: true, subtree: true }; // Mutation observer configuration
            observer.observe(b, config); // Start observing the body for mutations
        }
    }, false);
});
