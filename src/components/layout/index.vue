<template>
  <div>
    <app-header />
    <div class="box-main">
      <!-- 主区域渲染 -->
      <router-view></router-view>
    </div>
    <app-footer />
  </div>
</template>
<script>
import AppHeader from '@/components/layout/AppHeader'
import AppFooter from '@/components/layout/AppFooter'
export default {
  components: { AppHeader , AppFooter}
}
</script>

<style lang="css" scoped>
.box-main {
  width: 100%;
  min-height: calc(100vh - 180px);
  margin-top: 20px;
}
</style>