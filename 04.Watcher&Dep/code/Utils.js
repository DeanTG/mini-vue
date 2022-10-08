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
    new Watcher(expr, vm, (newVal) => {
      node.innerHTML = newVal
    })
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