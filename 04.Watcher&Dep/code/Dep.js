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