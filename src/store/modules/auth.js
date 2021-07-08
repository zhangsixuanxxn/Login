import { login, logout, refreshToken } from '@/api/auth'
import { PcCookie, Key } from '@/utils/cookie'   // 用来操作cookie

const state = {
  userInfo: PcCookie.get(Key.userInfoKey) ? JSON.parse(PcCookie.get(Key.userInfoKey)) : null,
  accessToken: PcCookie.get(Key.accessTokenKey),
  refreshToken: PcCookie.get(Key.refreshTokenKey)
}

const mutations = {
  SET_USER_STATE(state, data) {
    const { userInfo, access_token, refresh_token } = data
    // 保存到vuex中
    state.userInfo = userInfo
    state.accessToken = access_token
    state.refreshToken = refresh_token

    // 用户信息保存到cookie中
    PcCookie.set(Key.userInfoKey, userInfo)
    PcCookie.set(Key.accessTokenKey, access_token)
    PcCookie.set(Key.refreshTokenKey, refresh_token)
  },
  RESET_USER_STATE(state) {
    //状态置空
    state.userInfo = null
    state.accessToken = null,
    state.refreshToken = null
    //清空cookie信息
    PcCookie.remove(Key.userInfoKey)
    PcCookie.remove(Key.accessTokenKey)
    PcCookie.remove(Key.refreshTokenKey)
  }
}

const actions = {
  //登陆操作
  UserLogin({commit}, userInfo) {
    const { userName, password } = userInfo
    return new Promise ((resolve, reject) => {
      login( {userName: userName, password: password }).then(response => {
        //获取响应值
        const { code , data} = response
        if(code === 20000) {
          //登录成功，状态赋值
          commit('SET_USER_STATE', data)
        }
        resolve(response)
      }).catch(err => {
        //登录失败，重置状态
        commit('RESET_USER_STATE')
        reject(err)
      })
    })
  },
  // 退出操作
  UserLogout({state, commit}, redirectURL) {
    //调用退出方法  
    logout(state.accessToken).then(() => {
      //重置状态
      commit('RESET_USER_STATE')
      // 退出后，重写向地址，如果没有传重写向到登录页 /
      window.location.href = redirectURL || '/'
    }).catch(err => {
      console.info(err)
      commit('RESET_USER_STATE')
      window.location.href = redirectURL || '/'
    })
  },
  //使用refresh token获取token和用户信息
  sendRefreshToken({state, commit}) {
    return new Promise ( (resolve, reject) => {
      // 判断是否有刷新令牌
      if(!state.refreshToken) {
        commit('RESET_USER_STATE')
        reject('没有刷新令牌')
        return
      }
      refreshToken(state.refreshToken).then(response => {
        // 更新用户状态数据
        commit('SET_USER_STATE', response.data)
        resolve() //正常响应钩子
      }).catch(error => {
        commit('RESET_USER_STATE')
        resolve(error)
      })
    })
  }
}
export default {
  state,
  mutations,
  actions
}