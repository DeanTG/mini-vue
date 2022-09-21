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
    console.log(data, key, value)
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