class Observer {
  constructor(data) {
    this.observer(data)
  }
  observer(data) {
    Object.keys(data).forEach(key => {
      this.defineRective(data, key, data[key])
    })
  }
  defineRective(data, key, value) {
    // 递归遍历
    this.observer(value)
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get() {
        return value
      },
      set: (newVal) => {
        this.observer(newVal)
        if(newVal !== value) {
          value = newVal
        }
      }
    })
  }
}