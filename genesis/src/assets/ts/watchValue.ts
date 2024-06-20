type WatchValue = string | boolean

export const watchValue = {
  object: (
    obj: {
      [key: string]: WatchValue
    },
    key: string,
    callback: (oldValue: WatchValue, newValue: WatchValue) => void,
  ) => {
    if (!obj || !key) {
      return
    }

    let value = obj[key]

    Object.defineProperty(obj, key, {
      get: () => value,
      set: (newValue: WatchValue) => {
        const oldValue: WatchValue = value
        value = newValue
        callback(oldValue, newValue)
      },
      configurable: true,
    })
  },
}
