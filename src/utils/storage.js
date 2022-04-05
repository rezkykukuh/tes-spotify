export const setStorage = (key, item) => {
    return window.localStorage.setItem(key, item);
}

export const getStorage = (key) => {
    return window.localStorage.getItem(key);
}

export const deleteStorage = () => {
    return window.localStorage.clear();
}