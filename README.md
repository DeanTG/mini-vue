# 从0到1实现vue()
> 参考b站教程 [学前端不会VUE？但就是必须懂VUE原理](https://www.bilibili.com/video/BV15D4y1o73Z?p=3&spm_id_from=pageDriver) 的代码实现


## 原理
> vue 是采用数据劫持配合发布-订阅模式，通过`Object.defineProperty()`来劫持各个属性的setter和getter，在数据变动时，发布消息给依赖收集器，去通知观察者，做出对应的回调函数去更新视图

Vue 实现的响应式系统设计思路如下：
1. 侦测数据的变化(数据劫持/数据代理)
2. 收集视图依赖了哪些数据(依赖收集)
3. 数据变化时，自动通知更新视图(发布订阅模式)

基于以上思想 Vue2 的响应式系统实现步骤如下：
1. 实现一个监听器 Observer，用来劫持并监听所有属性，如果属性发生变化，就通知订阅者(Watcher)；
2. 实现一个订阅器 Dep，用来收集订阅者，对监听器 Observer 和 订阅者 Watcher 进行统一管理；
3. 实现一个订阅者 Watcher，可以收到属性的变化通知并执行相应的方法，从而更新视图；
4. 实现一个解析器 Compile，可以解析每个节点的相关指令，对模板数据和订阅器进行初始化。

![img](https://jonny-wei.github.io/blog/images/vue/vue%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%861.png)

### 图解
![vue原理](https://github.com/DMQ/mvvm/blob/master/img/2.png?raw=true)

## 学习过程
### [初始化处理挂载节点el](./01.node2Fragment)
### [处理节点compile](./02.compile)
### [劫持监听属性observer](./03.observer)
### [实现观察者Watcher和依赖收集器Dep](./04.Watcher&Dep)


## tips
* [剖析Vue实现原理](https://github.com/DMQ/mvvm)
* [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/getters.html#dep)
* [响应式原理](https://jonny-wei.github.io/blog/vue/vue/vue-observer.html#%E5%A6%82%E4%BD%95%E4%BE%A6%E6%B5%8B%E6%95%B0%E6%8D%AE%E7%9A%84%E5%8F%98%E5%8C%96)
