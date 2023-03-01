const mockJs = require('mockjs')

// const userList = [
//   {
//     name: '张三',
//     age: 18,
//     id: 1,
//     createTime: '2021-01-01 12:00:00',
//     avatar: 'https://img2.baidu.com/it/u=1609812019.jpg'
//   }
// ]

const userList = mockJs.mock({
  "data|100": [{
    name: '@cname', //中文名称
    ename: "@first", //英文名称
    "id|+1": 1,//数字从当前数开始后续依次加一
    avatar: '@image(200x200,@ename)', //生成图片
    createTime: '@datetime', //生成时间
  }]
})

module.exports = [{
  method: "post",
  url: "/api/users",
  response: ({ body }) => {
    //body 请求体
    //page  pageSize body
    return {
      code: 200,
      msg: 'success',
      data: userList
    }
  }
}]