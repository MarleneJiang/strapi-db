<script setup>
import { ref, reactive } from 'vue'
import strapiDb from './strapi-db/strapiDb.vue'

defineProps({
  msg: String
})
const pageCurrent = ref(1)
const collection = ref('subjects')
const strapi = ref()
const load = () => {
  strapi.value.loadMore()
}
const testData = reactive({
  "identifier": 'test@test.com',
  "password": '123456',
  "fields":[''],
  "sort":[''],
  "populate":'*',
  "filters":{
    answer: {
      $eq: 'C',
    },
  },
})
const login = (identifier, password) => {
  strapi.value.login(identifier, password).catch(err => {
    console.log(err)
  })
}

const refresh = () => {
  strapi.value.refresh()
}
const clear = () => {
  strapi.value.clear()
}
const reset = () => {
  strapi.value.reset()
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="info">
    <div>修改当前页：<input type="number" v-model="pageCurrent" /></div>
    <div>账号：<input type="text" v-model="testData.identifier" /></div>
    <div>密码：<input type="text" v-model="testData.password" /></div>
    <button @click="login(testData.identifier, testData.password)">登录</button>
    <div>修改指定字段：<input type="text" v-model="testData.fields" /></div>
    <div>修改排序：<input type="text" v-model="testData.sort[0]" /></div>
    <div>修改关联查询：<input type="text" v-model="testData.populate" /></div>
    <button @click="clear()">清空数据</button>
    <button @click="reset()">重置页数</button>
    <button @click="refresh()">刷新数据</button>
    <div>筛选(暂时无法手动修改)：<input type="text" :value="JSON.stringify(testData.filters)" /></div>

  </div>

  <strapi-db :collection="collection" v-slot:default="{ data, loading, error, hasMore, pagination }" ref="strapi"
    pageData="add" :pageCurrent="pageCurrent" :fields="testData.fields" :sort="testData.sort" :populate="testData.populate"
    :filters="testData.filters">
    <div class="main">
      <h2> DataList：<input v-model="collection" /></h2>
      <ul>
        <li v-for="item in data">
          {{ item }}
        </li>
      </ul>
      <button v-if="hasMore" @click="load">加载更多</button>
    </div>
    <div class="info">
      <h2> 其他信息 </h2>
      <p>加载状态：{{ loading }} || 加载更多：{{ hasMore }}</p>
      <p v-if="pagination">分页信息：{{ pagination }}</p>

      <p v-if="error">错误信息：{{ error }}</p>
    </div>



  </strapi-db>


</template>

<style scoped>
.info {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
  color: green;
}

.main {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
}

li {
  padding: 10px;
}
</style>
