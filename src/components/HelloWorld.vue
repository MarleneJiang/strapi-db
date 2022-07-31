<script setup>
import { ref } from 'vue'
import strapiDb from './strapi-db/strapiDb.vue'

defineProps({
  msg: String
})

const count = ref(0)


</script>

<template>
  <h1>{{ msg }}</h1>
  <strapi-db collection="type-id2unames" v-slot:default="{data, loading}">

      <ul>
        <li v-for="item in data">
          {{ item }}
        </li>
      </ul>
      <p>{{ loading }}</p>


  </strapi-db>
  
  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
