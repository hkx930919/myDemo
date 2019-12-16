<template>
  <div class="home">
    <!-- <VirtualListBase :listData="data" :itemSize="100" /> -->
    <VirtualListExtend
      :listData="data"
      :estimatedItemSize="100"
      v-slot="slotProps"
    >
      <Item :item="slotProps.item" />
    </VirtualListExtend>
  </div>
</template>

<script>
// @ is an alias to /src
import faker from "faker";
// import VirtualListBase from "@/components/VirtualListBase.vue";
import VirtualListExtend from "@/components/VirtualListExtend";
import Item from "@/components/VirtualListExtend/Item.vue";
let d = [];
for (let i = 0; i < 1000; i++) {
  d.push({ id: i, value: i });
}
console.log("--------d", d);
let data = [];
for (let id = 0; id < 1000; id++) {
  data.push({
    id,
    value: faker.lorem.sentences() // 长文本
  });
}

export default {
  name: "home",
  components: {
    // VirtualListBase,
    VirtualListExtend,
    Item
  },
  data() {
    return {
      d,
      data
    };
  }
};
</script>

<style lang="less">
.home {
  height: 100%;
}
</style>
