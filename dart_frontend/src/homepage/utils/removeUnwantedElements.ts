const removeUnwantedElements = () => {
    const unwantedSelectors = [
        '.scene-nav-info',
        '.float-tooltip-kap',
        'div[style*="overflow: hidden"]',
    ];

    unwantedSelectors.forEach((selector) => {
        const element = document.querySelector(selector);
        if (element) {
            element.remove();
        }
    });
};

export default removeUnwantedElements;
