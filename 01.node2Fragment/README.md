# 初始化处理挂载节点el

## 构造函数调用及传数
```
  // 调用vue 构造函数，传入mounted的dom节点或者选择器，以及data（先不考虑functiuon形式）、methods等
  new Mvue({
    el: '',
    data: {},
    methods: {}
  })
```

## 构造函数
```
  // 构造函数中把各参数绑定到实例对象上， 再调用compile 函数进行编译
  class MVue {
    constructor(options) {
      this.$options = options
      this.$data = options.data || {}
      this.$methods = options.methods || {}
      if(options.el) {
        new Compile(options.el, this)
      }
    }
  }
```

## comile 函数处理挂载节点
```
  // 1. 根据传入的el获取dom节点
  // 2. node2Fragment获取节点中dom元素
  class Compile {
    constructor(el) {
      this.$el = this.isElementNode(el) ? el : document.querySelector(el)
      // 提取节点
      const fragment = this.node2Fragment(this.$el)
      // 节点编译
      this.compile(fragment)
      this.$el.appendChild(fragment)
    }
    compile(fragment) {
    }
    // 使用DocumentFragment能解决直接操作DOM（appendchild）引发大量回流的问题
    node2Fragment(el) {
      // 创建文档碎片
      const newFragment = document.createDocumentFragment()
      let firstChild = null

      while(firstChild = el.firstChild) {
        // 提取原始文档节点（appchild会先删除再插入）
        newFragment.appendChild(firstChild)
      }

      return newFragment
    }
    isElementNode(node) {
      // 1: ELEMENT_NODE
      return node.nodeType === 1
    }
  }
```

## comile 函数处理区分不同dom节点
```
   compile(fragment) {
    console.log(fragment)
    const childNodes = [...fragment.childNodes]
    childNodes.forEach(node => {
      if(this.isElementNode(node)) {
        // elementNode
      } else {
        // textNode
      }

      if(node && node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }
```

## tips
* [nodeType](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)
* [深入理解DocumentFragment -文档片段](https://juejin.cn/post/6952499015879507982)
