class Observer {
  constructor(data) {
    this.observer(data)
  }
  observer(data) {
    if(data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        this.defineRective(data, key, data[key])
      })
    }
  }
  defineRective(data, key, value) {
    // 递归遍历
    this.observer(value)
    const dep = new Dep()
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get() {
        // 订阅数据变化
        Dep.target && dep.addSubs(Dep.target)
        return value
      },
      set: (newVal) => {
        this.observer(newVal)
        if(newVal !== value) {
          value = newVal
          dep.notify()
        }
      }
    })
  }
}