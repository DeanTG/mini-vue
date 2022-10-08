# 实现观察者Watcher和依赖收集器Dep

## Dep
```
  // 1. 在observer中，实例化Dep 依赖收集器，并在get方法中添加依赖
  // 2. 在observer set 时，调用dep实例的notify
  // 3. 
  class Dep {
    constructor() {
      this.subs = []
    }
    addSubs(watcher) {
      this.subs.push(watcher)
    }
    notify() {
      this.subs.forEach(w => w.update())
    }
  }

  class Observer {
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

```

## Watcher
```
  // 1. watcher暂存旧值
  // 2. 对外暴露update 方法进行数据更新
  // 3. 在compile中调用watcher，传入回调函数进行数据更新

  class Watcher {
    constructor(expr, vm, cb) {
      this.expr = expr
      this.vm = vm
      this.cb = cb
      // 暂存旧值
      this.oldValue = this.getOldValue()
    }
    getOldValue() {
      // 【重点】借用Dep构造函数绑定watcher
      Dep.target = this
      const oldValue = compileUtils.getValue(this.expr, this.vm)
      // 【重点】销毁对Dep的借用
      Dep.target = null
      return oldValue
    }
    update() {
      const newVal = compileUtils.getValue(this.expr, this.vm)
      if(newVal !== this.oldValue) {
        this.cb(newVal)
      }
    }
  }

  // Compile 种调用 wathcer
  html(node, expr, vm) {
    node.innerHTML = this.getValue(expr, vm)
    new Watcher(expr, vm, (newVal) => {
      node.innerHTML = newVal
    })
  }
```

## tips
1. 由于初始化时先调用了数据拦截器 Observer，并对数据进行了劫持
2. 再调用compile 解析指令式时调用了watcher，watcher 初始化时暂存旧值getOldValue 方法，触发了observer get方法
3. observer get中需要订阅数据变化，所以watcher 中临时借用了Dep构造函数绑定watcher，并在observer get中传入watcher，以添加依赖dep。在完成这个操作之后销毁借用



