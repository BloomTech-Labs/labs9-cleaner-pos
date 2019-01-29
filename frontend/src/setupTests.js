import 'jest-dom/extend-expect';

const localStorageMock = (function() {
    const store = {};

    return {
        getItem: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = value.toString();
        },
        clear: function() {
            store = {};
        }
    };

})();

Object.defineProperty(window, 'localStorage', {
     value: localStorageMock
});