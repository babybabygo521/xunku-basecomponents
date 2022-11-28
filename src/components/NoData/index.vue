<template>
  <div class="no-found-info" :style="{padding: newPadding}">
    <div>
      <img v-if="size === 'large'" class="large-img" width="244px" src="./images/noData-large.png">
      <img v-if="size === 'small'" class="small-img" width="133px" src="./images/noData-small.png">
      <img v-if="size === 'mini'" class="mini-img" width="114px" src="./images/noData-small.png">
    </div>
    <span class="label" :class="[size]">{{ label }}</span>
    <div v-if="createText.length>0" style="text-align: center">
      <span class="create-one" @click="onCreateClick">{{ createText }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoData',
  props: {
    size: { type: String, default: 'large' },
    label: { type: String, default: '暂无数据' },
    type: { type: String, default: 'no-data' },
    createText: { type: String, default: '' },
    padding: { type: String, default: '' }
  },
  computed: {
    newPadding() {
      if (this.padding === '') {
        return '20% 0'
      }
      return this.padding
    }
  },
  methods: {
    onCreateClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="scss">
.no-found-info {
  // 需要什么样的图标照这个no-data复制就可以了，目录统一放到tips下面
  .large-img {
    margin-bottom: 24px;
  }
  .small-img {
    margin-bottom: 13px;
  }
  .mini-img {
    margin-bottom: 11px;
  }
  .create-one {
    cursor: pointer;
    height: 24px;
    line-height: 24px;
    padding: 10px;
    margin: 10px;
    display: inline-block;
    background-color: var(--button-bg-color);
    color: #fff;
    border-radius: 10px;
  }

  .info-bg {
    background-size: 100% 100%;
    margin: 0 auto;
  }

  text-align: center;

  .label {
    color: #98A9C1;
    white-space: nowrap;
  }

  .mini {
    width: 14px;
    height: 14px;
    font-size: 6px;
    line-height: 6px;
  }

  .small {
    width: 18px;
    height: 18px;
    font-size: 12px;
    line-height: 12px;
  }

  .large {
    font-size: 16px;
    width: 111px;
    height: 32px;
    line-height: 16px;
  }

}
</style>
