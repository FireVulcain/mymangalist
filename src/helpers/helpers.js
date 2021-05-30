export const getPurgedObj = (o) => {
    let obj = o;

    let stringfiedObj = JSON.stringify(obj, (key, value) => {
        return ["", null].includes(value) || (typeof value === "object" && (value.length === 0 || Object.keys(value).length === 0))
            ? undefined
            : value;
    });
    let resObj = JSON.parse(stringfiedObj);
    let isEmptyPropsPresent = ["{}", "[]", '""', "null"].some((key) => stringfiedObj.includes(key));
    if (isEmptyPropsPresent) {
        return getPurgedObj(resObj);
    }
    return resObj;
};

export const generateYear = () => {
    let max = new Date().getFullYear() + 1;
    let min = max - (new Date().getFullYear() + 1 - 1940);

    let arrayOfYears = [];
    for (let i = max; i >= min; i--) {
        arrayOfYears.push({ label: i, value: `${i}%` });
    }
    return arrayOfYears;
};

export const debounce = (callback, delay) => {
    var timer;
    return function () {
        var args = arguments;
        var context = this;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, delay);
    };
};
