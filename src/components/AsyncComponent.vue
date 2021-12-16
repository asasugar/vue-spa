<template>
  <div v-if="weather">
    <h4 @click="getSimpleWeather">这个是一个异步加载数据</h4>
    <p>城市：{{ weather.city }}</p>
    <p>
      当前天气详情：
      <span v-for="(item, index) in weather.realtime" :key="index">{{ item }},</span>
    </p>
    <p>近5天天气情况：</p>
    <div v-for="(item, index) in weather.future" :key="index">
      <p>日期：{{ item.date }}</p>
      <p>天气情况：{{ item.weather }}</p>
      <p>风向：{{ item.direct }}</p>
      <p>温度：{{ item.temperature }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, getCurrentInstance, ref } from "vue";
export default defineComponent({
  setup() {
    let weather = ref();
    const { proxy } = getCurrentInstance();
    // 异步加载数据
    const getSimpleWeather = async () => {
      const json = await proxy.$http.get("/api/simpleWeather/query", {
        data: { city: 481, key: "55333d85ca99360f79d67b452b51e277" },
        retry: 3,
        retryDelay: 1000,
        cache: true,
      });
      weather.value = json;
    };
    onMounted(() => {
      getSimpleWeather();
    });
    return {
      weather,
    };
  },
});
</script>