<script setup>
import { ref } from 'vue'
import strapiDb from './strapi-db/strapiDb.vue'

defineProps({
  msg: String
})
const pageCurrent = ref(1)
const collection = ref('tests')
const strapi = ref()
const load = () => {
  strapi.value.loadMore()
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <strapi-db :collection="collection" v-slot:default="{ data, loading, error, hasMore, pagination }" ref="strapi" pageData="add" :pageCurrent="pageCurrent">
    <div class="main">
      <h2> DataList：<input v-model="collection"/></h2>
      <ul>
        <li v-for="item in data">
          {{ item }}
        </li>
      </ul>
      <button v-if="hasMore" @click="load">加载更多</button>
    </div>
    <div class="info">
      <h2> 其他信息 </h2>
      <p>加载状态：{{ loading }}  || 加载更多：{{ hasMore }}</p>
      <p v-if="pagination">分页信息：{{ pagination }}</p>
      <input type="number" v-model="pageCurrent">
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
.main{
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
}
li{
  padding: 10px;
}
</style>
