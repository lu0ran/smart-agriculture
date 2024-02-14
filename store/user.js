import { defineStore } from 'pinia';
import config from '@/config'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import defaultAvatar from "@/static/images/profile.jpg"

const baseUrl = config.baseUrl

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: storage.get(constant.name),
    avatar: storage.get(constant.avatar),
    roles: storage.get(constant.roles),
    permissions: storage.get(constant.permissions)
  }),

  actions: {
    // 登录
    Login(userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid).then(res => {
          setToken(res.token)
		  this.token = res.token
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo() {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const user = res.user
          const avatar = (user == null || user.avatar == "" || user.avatar == null) ? defaultAvatar : baseUrl + user.avatar
          const username = (user == null || user.userName == "" || user.userName == null) ? "" : user.userName
          if (res.roles && res.roles.length > 0) {
			  this.roles = res.roles;
			  this.permissions = res.permissions;
          } else {
			  this.roles = res.roles;
          }
		  this.name = username;
		  this.avatar = avatar;
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut() {
      return new Promise((resolve, reject) => {
        logout(this.token).then(() => {
			this.token = '';
			this.roles = [];
			this.permissions = [];
          removeToken()
          storage.clean()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
});
