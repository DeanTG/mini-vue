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