# 从0到1实现vue()
> 参考b站教程 [学前端不会VUE？但就是必须懂VUE原理](https://www.bilibili.com/video/BV15D4y1o73Z?p=3&spm_id_from=pageDriver) 的代码实现


## 原理
> vue 是采用数据劫持配合发布-订阅模式，通过`Object.defineProperty()`来劫持各个属性的setter和getter，在数据变动时，发布消息给依赖收集器，去通知观察者，做出对应的回调函数去更新视图

### 图解
![vue原理](https://github.com/DMQ/mvvm/blob/master/img/2.png?raw=true)

## 学习过程
### [初始化处理挂载节点el](./01.node2Fragment)
### [处理节点compile](./02.compile)
### [劫持监听属性observer](./03.observer)
### [实现观察者Watcher和依赖收集器Dep](./04.Watcher&Dep)


## tips
* [剖析Vue实现原理](https://github.com/DMQ/mvvm)