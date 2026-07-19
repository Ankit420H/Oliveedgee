import '@testing-library/jest-dom';

window.HTMLElement.prototype.scrollIntoView = function() {};
window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {},
        addEventListener: function() {},
        removeEventListener: function() {},
        dispatchEvent: function() { return false; },
    };
};
