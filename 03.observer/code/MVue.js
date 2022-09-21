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

class Compile {
  constructor(el, vm) {
    this.$el = this.isElementNode(el) ? el : document.querySelector(el)
    // 提取节点
    const fragment = this.node2Fragment(this.$el)
    // 节点编译
    this.compile(fragment, vm)
    this.$el.appendChild(fragment)
  }
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
  compileText(node, vm) {
    if(/\{\{(.+?)\}\}/.test(node.textContent)) {
      compileUtils['text'](node, node.textContent, vm)
    }
  }
  // 使用DocumentFragment能解决直接操作DOM引发大量回流的问题
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
  isDirective(name) {
    return name.startsWith('v-')
  }
  isEventName(name) {
    return name.startsWith('@')    
  }
}

class MVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data || {}
    this.$methods = options.methods || {}
    if(options.el) {
      new Observer(this.$data)
      new Compile(options.el, this)
    }
  }
}