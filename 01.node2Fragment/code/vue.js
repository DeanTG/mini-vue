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
    const childNodes = [...fragment.childNodes]
    childNodes.forEach(node => {
      if(this.isElementNode(node)) {
        // elementNode
      } else {
        // textNode
      }

      if(node.childNodes&& node.childNodes.length) {
        this.compile(node)
      }
    })

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

    return firstChild
  }
  isElementNode(node) {
    // 1: ELEMENT_NODE
    return node.nodeType === 1
  }
}

class MVue {
  constructor(options) {
    if(options.el) {
      new Compile(this.$el)
    }
  }
}