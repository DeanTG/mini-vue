# 指令解析器compile

## 编译不同节点
```
  compile(fragment, vm) {
    // spread 转换为数组
    const childNodes = [...fragment.childNodes]
    childNodes.forEach(node => {
      // elementNode
      if(this.isElementNode(node)) {
        this.compileElement(node, vm)
      } else {
        // textNode
        this.compileText(node, vm)
      }

      if(node && node.childNodes && node.childNodes.length) {
        this.compile(node, vm)
      }
    })

  }
```

## 元素节点编译 compileElement
```
  // 1. 获取不同指令
  compileElement(node, vm) {
    const attributes = [...node.attributes]
    attributes.forEach(({name, value}) => {
      if(this.isDirective(name)) {
        // 提取指令名称
        const [, directive] = name.split('-')
        // 获取详细指令名称，区分v-on:click v-html等
        const [dirName, attrName]= directive.split(':')
        console.log(dirName, attrName)
        compileUtils[dirName](node, value, vm, attrName)          
        // 删除指令属性
        node.removeAttribute(name)
      } else if (this.isEventName(name)) {
        const [, eventName] = name.split('@')
        compileUtils['on'](node, value, vm, eventName)
      }
    })
  }
```

## 节点处理函数 compileUtils
```
  // 1. 根据不同指令处理不同dom元素
  // 2. 根据表达式获取实例vm上的值
  // 3. 通过getValue 统一获取不同类型值
  // 4. 事件绑定指令绑定不同事件
  const compileUtils = {
    // 可能获取的person.value,  computed 等数据
    getValue(expr, vm) {
      return expr.split('.').reduce((data, cur) => data[cur], vm.$data)
    },
    text(node, expr, vm) {
      let value
      if(expr.indexOf('{{') !== -1) {
        value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
          return this.getValue(args[1], vm)
        })
      } else {
        value = this.getValue(expr, vm)
      }
      node.textContent = value
    },
    html(node, expr, vm) {
      node.innerHTML = this.getValue(expr, vm)
    },
    model(node, expr, vm) {
      node.value = this.getValue(expr, vm)
    },
    on(node, expr, vm, event) {
      node.addEventListener(event, vm.$methods[expr].bind(vm), false)
    },
    bind(node, expr, vm, attrName) {
      node.setAttribute(attrName, this.getValue(expr, vm))
    },
    updator: {
    }
  }
```

## 文本节点编译 compileText
```
  // 1.通过正则判断文本节点是否需要编译，再调用元素节点中文本的处理方法
  compileText(node, vm) {
    if(/\{\{(.+?)\}\}/.test(node.textContent)) {
      compileUtils['text'](node, node.textContent, vm)
    }
  }
```

## tips
* [replace](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
