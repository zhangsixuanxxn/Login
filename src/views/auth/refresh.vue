<template>
  <div>
    <!-- 弹窗 -->
    <div v-show="visible">
      <!-- 要展示的内容 -->
      <div class="content">
        <span v-html="message"></span>
      </div>
      <!-- 半透明背景 -->
      <div class="over"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: 1, // 用于打开弹窗，1开，0关
      message: '请稍后，正在重新身份认证...',
      redirectURL: null
    }
  },

  created() {
    this.redirectURL = this.$route.query.redirectURL || '/'
    this.refreshLogin()
  },
  methods: {
    // 刷新令牌登录
    refreshLogin() {
      this.$store.dispatch('sendRefreshToken').then(response => {
        console.log(response)
        this.message = '身份已认证，正在进行页面跳转...'
        window.location.href = this.redirectURL
      }).catch(error => {
        console.log(error)
        this.message = `您的身份已过期，请点击<a href="/?redirectURL${this.redirectURL}"重新登录>`
      })
    }
  }
}
</script>
<style scoped>
.content {
  position: fixed;
  height: 120px;
  width: 500px;
  line-height: 120px;
  text-align: center;
  font-size: 19px;
  color: #303133;
  background-color: #fff;
  border-radius: 0.25rem;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
a {
  color: #345dc2;
  text-decoration: none;
}
a:hover {
  text-decoration: underline; 
}
.over {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.5; /* 透明度为50% */
  filter: alpha(opacity=50);
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #000;
}

</style>