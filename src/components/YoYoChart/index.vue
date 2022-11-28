<template>
  <section class="chart-section">
    <figure :style="theme === 'dark' ? 'background-color: #100c2a' : ''">
      <v-chart
        v-if="option"
        ref="chart"
        :option="option"
        :init-options="initOptions"
        autoresize
        :loading="loading"
        :loading-options="loadingOptions"
        :theme="theme"
        :style="{height: height}"
        @zr:click="onChartZrClick"
        @click="onChartClick"
      />
      <no-data v-else />
    </figure>
  </section>
</template>

<script>
import VChart from 'vue-echarts'
import NoData from '../NoData'

export default {
  name: 'YoYoChart',
  components: { NoData, VChart },
  props: {
    option: { type: Object, default: () => {}, required: true },
    theme: { type: String, default: '' },
    height: { type: String, default: '200px' }
  },
  data() {
    return {
      loading: false,
      loadingOptions: {
        text: '加载中...',
        color: '#4ea397',
        maskColor: '#FFFFFF66'
      },
      initOptions: {
        renderer: 'canvas'
      }
    }
  },
  methods: {
    getOption() {
      if (this.option) {
        this.loading = false
        return this.option
      } else {
        this.loading = true
        return null
      }
    },
    onChartClick(...args) {
      console.log('click from echarts', ...args)
      this.$emit('click', ...args)
    },
    onChartZrClick(...args) {
      // console.log('click from zrender', ...args)
    }
  }
}
</script>

<style scoped lang="scss">
.chart-section {
  figure {
    .echarts {
      width: 100%;
      min-width: 200px;
      height: 200px;
    }
    margin: 0;
  }
}
</style>
