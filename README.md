
<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h1 align="center" ><strong>StrapiDB</strong></h1>

  <p align="center">
    帮助您专注于前端开发的基于Strapi的前端组件。
    


<br />
    <a href="https://github.com/MarleneJiang/strapi-db"><strong>浏览组件使用文档 »</strong></a>
    <br />
    <a href="https://github.com/MarleneJiang/strapi-db">View Demo</a>
    ·
    <a href="https://github.com/MarleneJiang/strapi-db/issues">Report Bug</a>
    ·
    <a href="https://github.com/MarleneJiang/strapi-db/issues">Request Feature</a>
  </p>
</div>




<!-- ABOUT THE PROJECT -->
## 项目说明


Strapi是一款非常优秀的无头CMS，它基于koa2开发，提供了后端、管理端以及数据库等服务，且支持众多插件扩展。Strapi的出现为我们全栈开发提供了非常大的帮助，让我们不需要费力专注于后端和数据库，而只需将开发中心放在前端，这样我们就可以专注于前端开发。

为此呢，作者秉持了这样敏捷开发的理念，进一步为Strapi与Vue.js交互，即前后端交互，提供更好的开发体验与便利。它的灵感主要来自于[UniCloudDb](https://uniapp.dcloud.net.cn/uniCloud/unicloud-db.html)。

`<strapi-db>`组件是一个专用于Strapi的Restful API查询组件。<br/>
前端通过组件方式直接获取strapi的接口的数据，并绑定在界面上进行渲染。<br/>
在传统开发中，开发者需要在前端定义data、通过request联网获取接口数据、然后赋值给data。同时后端还需要写接口来查库和反馈数据。<br/>
但有了strapi和strapi-db，就不再需要编写增删查改的接口和前端请求代码，这些工作，只需要一行代码。写组件，设组件的属性，在属性中指定要查什么表、哪些字段、以及查询条件，就OK了！<br />
IDE敲下`strapi-db`代码块，得到如下代码，然后通过collection属性指定要查询表“table1”，通过field属性指定要查询字段“field1”的数据。查询结果data就可以直接渲染在界面上。
```html
<strapi-db v-slot:default="{data}" collection="table1" fields="field1">
	<view>
	    <ul>
            <li v-for="item in data">
            {{ item }}
            </li>
        </ul>
	</view>
</strapi-db>

```

`<strapi-db> `组件尤其适用于列表、详情等展示类页面。开发效率可以大幅度的提升。
`<strapi-db>` 组件不仅支持查询。还自带了add、remove、update方法，见下文方法章节。

<p align="right">(<a href="#readme-top">回到顶部</a>)</p>



### Built With

组件主要基于无头的`Strapi`和MVVM前端开发框架`Vue.js`。
请注意，本组件完全基于Vue3.



<p align="right">(<a href="#readme-top">回到顶部</a>)</p>



<!-- GETTING STARTED -->
## 使用样例

这是一个简单示例来帮助你更快的掌握组件的使用方法。

### 准备使用

组件的所有功能皆已经存放于`strapiDb.vue`文件中，请将该文件拖拽到您开发的vue3项目的根目录中。

### 安装依赖

组件不可避免地需要提前在项目中安装依赖，我们推荐使用`yarn`来安装依赖

1. axios
   ```sh
    yarn add axios
   ```
2. qs
   ```sh
    yarn add qs
   ```
### 开始使用
在文件中引入该组件，并在template内编写如下代码即可。更详细的例子请参考[preview.vue](https://github.com/MarleneJiang/strapi-db/blob/main/src/components/preview.vue)
``` html
<strapi-db v-slot:default="{data}" collection="table1" fields="field1" baseUrl="http://www.example.com/api">
	<view>
	    <ul>
            <li v-for="item in data">
            {{ item }}
            </li>
        </ul>
	</view>
</strapi-db>
```

<p align="right">(<a href="#readme-top">回到顶部</a>)</p>



<!-- USAGE EXAMPLES -->
## 组件说明文档


## 组件属性
| 属性 | 类型 | 描述 |
| --- | --- | --- |
| v-slot:default |  | 查询状态（失败、联网中）及结果（data），详情可见V-slot相关章节 |
| ref | String | vue组件引用标记，用于调用组件内方法 |
| baseUrl | String | Strapi管理端的API地址，默认为[https://strapi.marlenej.com/api](https://strapi.marlenej.com/api) |
| collection | String | 表名。支持输入多个表名，用 , 分割 |
| fields | String，Array | 指定要查询的字段，多个字段用 array传入。不写本属性，即表示查询所有字段。 |
| filters | Object | 查询条件，对记录进行过滤。 |
| sort | String，Array | 排序字段及正序倒序设置 |
| populate | String，Array | 手动指定使用的关联关系 |
| pageData | String | 分页策略选择。值为 add 代表下一页的数据追加到之前的数据中，常用于滚动到底加载下一页；值为 replace 时则替换当前data数据，常用于PC式交互，列表底部有页码分页按钮，默认值为add |
| pageCurrent | Number | 当前页 |
| pageSize | Number | 每页数据数量 |
| getCount | Boolean | 是否查询总数据条数，默认 true，需要分页模式时指定为 true |
| getOne | Number | 指定查询结果的ID为多少 |
| distinct | Boolean | 是否对数据查询结果中重复的记录（根据id）进行去重，默认值true |
| loadtime | String | 数据加载方式，详情见下 |
| @load | EventHandle | 成功回调。联网返回结果后，若希望先修改下数据再渲染界面，则在本方法里对data进行修改 |
| @error | EventHandle | 失败回调 |

### 示例
比如strapi有个user的表，里面有字段id、name，查询id=1的数据，那么写法如下：
**注意下面示例使用了getOne会返回一条对象形式的data，如不使用getOne，data将会是数组形式，即多一层。**
```vue
<template>
  <view>
    <strapi-db v-slot:default="{data}" collection="user" getOne=1>
      <view>
          {{ data.name}}
      </view>
    </strapi-db>
  </view>
</template>

```
### V-slot
```vue
<strapi-db v-slot:default="{data,pagination,loading,hasMore,error}"></strapi-db>

```
| 属性 | 类型 | 描述 |
| --- | --- | --- |
| data | Array | 查询结果 |
| pagination | Object | 分页属性 |
| loading | Boolean | 查询中的状态。可根据此状态，在template中通过v-if显示等待内容，如<view v-if="loading">加载中...</view> |
| hasMore | Boolean | 是否有更多数据。可根据此状态，在template中通过v-if显示没有更多数据了。部分特殊情况下存在BUG。 |
| error | Object | 查询错误。可根据此状态，在template中通过v-if显示等待内容，如<view v-if="error">加载错误</view> |

#### 状态示例
```vue
<strapi-db v-slot:default="{data, loading, error}" collection="user">
	<view v-if="error">{{error.message}}</view>
	<view v-else-if="loading">正在加载...</view>
	<view v-else>
		<ul>
        <li v-for="item in data">
          {{ item }}
        </li>
     </ul>
	</view>
</strapi-db>


```
### collection
collection即strapi中的表名。
```vue
<strapi-db v-slot:default="{data, loading, error}" collection="user">
	<view v-if="error">{{error.message}}</view>
	<view v-else-if="loading">正在加载...</view>
	<view v-else>
		{{data}}
	</view>
</strapi-db>

```
### populate
populate填写某个关联字段或者`%2A`(表示将关联的字段一并显示，它是`*`的转义字符)。
> 如果仅需要关联一个字段，请不要使用array格式，尤其是*

如果我们需要该表显示关联的categories字段，可以传入如下内容到populate参数。
```javascript
['categories']
```
### fields
fields指定collection中要查询的字段，不填该参数则默认查询所有字段
例如，只查询title和body字段，则传入如下内容到fields参数。
```javascript
['title', 'body']
```
### filters
filters中指定要查询的条件。比如只查询某个字段的值符合一定条件的记录。
例如，如果想要查询username = John 的 记录，可以将下面的Object传入filters参数。等于的操作符即$eq
```vue
username: {
      $eq: 'John',
}
```
更多的操作符请参照下表：

| Operator

 | Description

 |
| --- | --- |
| $eq

 | 等于

 |
| $ne

 | 不等于

 |
| $lt

 | 小于

 |
| $lte

 | 小于等于

 |
| $gt

 | 大于

 |
| $gte

 | 大于等于

 |
| $in

 | Included in an array

 |
| $notIn

 | Not included in an array

 |
| $contains

 | Contains (case-sensitive)

 |
| $notContains

 | Does not contain (case-sensitive)

 |
| $containsi

 | Contains

 |
| $notContainsi

 | Does not contain

 |
| $null

 | Is null

 |
| $notNull

 | Is not null

 |
| $between

 | Is between

 |
| $startsWith

 | Starts with

 |
| $endsWith

 | Ends with

 |
| $or

 | Joins the filters in an "or" expression

 |
| $and

 | Joins the filters in an "and" expression |

### sort
格式为 字段名 空格 asc(升序)/desc(降序)，多个字段用array，优先级为字段顺序
示例代码：
```vue
<strapi-db sort="['title:asc', 'slug:desc']"></strapi-db>
```
### loadtime
| 值 | 类型 | 描述 |
| --- | --- | --- |
| auto | String | 页面就绪后或属性变化后加载数据，默认为auto |
| onready | String | 页面就绪后不自动加载数据，属性变化后加载。适合在onready中接收上个页面的参数作为filters条件时。 |
| manual | String | 手动模式，不自动加载数据。如果涉及到分页，需要先手动修改当前页，在调用加载数据 |

### @事件

- load事件

load事件在查询执行后、渲染前触发，一般用于查询数据的二次加工。比如查库结果不能直接渲染时，可以在load事件里先对data进行预处理。
```vue
...
<strapi-db @load="handleLoad" />
...

handleLoad(data, pagination) {
  // `data` 当前查询结果
  // `pagination` 分页信息
}

```

- error事件

error事件在查询报错时触发，比如联网失败。
```vue
...
<strapi-db @error="handleError" />
...

handleError(e) {
  // {message}
}

```
## 组件方法
### loadData
当 <strapi-db> 组件的 manual 属性设为 true 时，不会在页面初始化时联网查询数据，此时需要通过本方法在需要的时候手动加载数据。
```vue
strapi.value.loadData() //strapi为strapi-db组件的ref属性值

```
### loadMore
在列表的加载下一页场景下，使用ref方式访问组件方法，加载更多数据，每加载成功一次，当前页 +1
```vue
strapi.value.loadMore() //strapi为strapi-db组件的ref属性值

```
### clear
清空已加载的数据，但不会重置当前分页信息
```vue
strapi.value.clear() //strapi为strapi-db组件的ref属性值

```
### reset
重置当前分页信息，并重新加载数据
```vue
strapi.value.reset() //strapi为strapi-db组件的ref属性值

```
### refresh
清空并重新加载当前页面数据
```vue
strapi.value.refresh() 

```
### login
本组件提供登录的方法。strapi自带登录系统，用户权限管理。部分api存在权限限制，需要用户鉴权。通过登录方法可以自动取得JWT并存放于localStorage中。之后使用strapiDb组件时会自动附带JWT。所以本方法应在strapi-db组件创建之前调用。
identifier：账号/邮箱
password：密码
```javascript
strapi.value.login(identifier, password)
```
### addData
顾名思义，添加一条数据。
```javascript
strapi.value.addData(collection,data)
```
### removeData
顾名思义，删除一条数据。
```javascript
strapi.value.removeData(id,collection)
```
### updateData
顾名思义，更改一条数据的内容。
```javascript
strapi.value.updateData(id,collection,data)
```

<p align="right">(<a href="#readme-top">回到顶部</a>)</p>





