# 劫持监听属性observer

```
  1. 设置newVal 时 objectVal 也需要拦截
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
```

## tips
* [defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)