export const watchValue = {
    object: (obj, key, callback) => {
        if (!obj || !key) {
            return;
        }
        let value = obj[key];
        Object.defineProperty(obj, key, {
            get: () => value,
            set: (newValue) => {
                const oldValue = value;
                value = newValue;
                callback(oldValue, newValue);
            },
            configurable: true,
        });
    },
};
