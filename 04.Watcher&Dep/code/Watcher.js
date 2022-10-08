class Watcher {
  constructor(expr, vm, cb) {
    this.expr = expr
    this.vm = vm
    this.cb = cb
    // 暂存旧值
    this.oldValue = this.getOldValue()
  }
  getOldValue() {
    Dep.target = this
    const oldValue = compileUtils.getValue(this.expr, this.vm)
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