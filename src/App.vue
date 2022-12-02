<!--
 * @Author: ND_LJQ
 * @Date: 2022-12-02 14:44:13
 * @LastEditors: ND_LJQ
 * @LastEditTime: 2022-12-02 15:19:48
 * @Description: 
 * @Email: ndliujunqi@outlook.com
-->
<script setup lang="ts">
// import HelloWorld from "./components/HelloWorld.vue";
// import TheWelcome from "./components/TheWelcome.vue";
import { watch, reactive, inject, computed, ref } from 'vue';
// import ContributeCalendars from './components/ContributeCalendars/index.vue'
import axios from 'axios';
const contribStyle = {
  rectWidth: 12,
  rectHeight: 12, //推荐在11-16内调节
};

let weekDate: any = reactive({
  weeks: {},
});

axios.get('/api/getUsers').then(res => {
  weekDate.weeks = res.data.data.weeks;
});
const returnData = ref('');

const getReturnData = (val: any) => {
  console.log(val);
  returnData.value = val;
};

const pData = computed(() => {
  return returnData;
});

watch(
  pData,
  (newV, oldV) => {
    console.log(newV.value);
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div id="test">
    <ContributeCalendars
      msg="Vite + Vue"
      v-model:contribStyle="contribStyle"
      v-model:contribData="weekDate"
      v-model:thisDay="returnData"
      @getThisDay="getReturnData"
    />
  </div>
</template>

<style scoped>
#test {
  width: 1000px;
  height: 100px;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
