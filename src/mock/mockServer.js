//使用mock.js提供的数据接口
//1.下载mock npm install mockjs --save
import Mock from 'mockjs'
import data from './data.json'
//返回goods的数据
Mock.mock('/goods', {code:0, data: data.goods})
// 返回ratings的接口
Mock.mock('/ratings', {code:0, data: data.ratings})
// 返回info的接口
Mock.mock('/info', {code:0, data: data.info})

//不需要使用export ，不需要向外暴露任何数据，只需要能保存执行即可
//需要在main.js中使用mockServer