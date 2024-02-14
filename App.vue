<script setup>
	import { getCurrentInstance } from "vue";
	const $modal = getCurrentInstance().appContext.config.globalProperties.$modal;
	import {
		useUserStore
	} from '@/store/user';
	import {
		getToken
	} from '@/utils/auth';

	function initApp() {
		checkLogin();
	}

	function checkLogin() {
		if (!getToken()) {
			$modal.msgError("请先登录");
			uni.reLaunch({
				url: '/pages/login/index'
			})
		}
	}
	console.log('App Launch')
	initApp();
</script>

<style lang="scss">
	@import '@/static/scss/index.scss'
	/*每个页面公共css */
</style>