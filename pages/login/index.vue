<template>
	<view class="normal-login-container">
		<view class="logo-content align-center justify-center flex">
			<!-- <image style="width: 100rpx;height: 100rpx;" :src="globalConfig.appInfo.logo" mode="widthFix">
			</image> -->
			<text class="title">移动端登录</text>
		</view>
		<view class="login-form-content">
			<view class="input-item flex align-center">
				<view class="iconfont icon-user icon"></view>
				<input v-model="loginForm.username" class="input" type="text" placeholder="请输入账号" maxlength="30" />
			</view>
			<view class="input-item flex align-center">
				<view class="iconfont icon-password icon"></view>
				<input v-model="loginForm.password" type="password" class="input" placeholder="请输入密码" maxlength="20" />
			</view>
			<view class="input-item flex align-center" style="width: 60%;margin: 0px;" v-if="captchaEnabled">
				<view class="iconfont icon-code icon"></view>
				<input v-model="loginForm.code" type="number" class="input" placeholder="请输入验证码" maxlength="4" />
				<view class="login-code">
					<image :src="codeUrl" @click="getCode" class="login-code-img"></image>
				</view>
			</view>
			<view class="action-btn">
				<button @click="handleLogin" class="login-btn cu-btn block bg-blue lg round">登录</button>
			</view>
		</view>

		<view class="xieyi text-center">
			<text class="text-grey1">登录即代表同意</text>
			<text @click="handleUserAgrement" class="text-blue">《用户协议》</text>
			<text @click="handlePrivacy" class="text-blue">《隐私协议》</text>
		</view>
	</view>
</template>

<script setup>
	import {
		getCodeImg
	} from "@/api/login.js";
	import {
		getCurrentInstance,
		ref
	} from "vue";
	import {
		useUserStore
	} from "../../store/user";
	const $modal = getCurrentInstance().appContext.config.globalProperties.$modal;
	const userStore = useUserStore()
	let codeUrl = ref('');
	let captchaEnabled = ref(true);
	let loginForm = ref({
		username: 'admin',
		password: 'admin123',
		code: '',
		uuid: '',
	});
	getCode();

	function getCode() {
		getCodeImg().then(res => {
			captchaEnabled.value = res.captchaEnabled == undefined ? true : res.captchaEnabled
			if (captchaEnabled.value) {
				codeUrl.value = 'data:image/gif;base64,' + res.img;
				loginForm.value.uuid = res.uuid
			}
		})
	}

	async function handleLogin() {
		if (loginForm.value.username === '') {
			$modal.msgError("请输入账号");
		} else if (loginForm.value.password === "") {
			$modal.msgError("请输入您的密码")
		} else if (loginForm.value.code === "" && captchaEnabled.value) {
			$modal.msgError("请输入验证码")
		} else {
			$modal.loading("登录中，请耐心等待...")
			pwdLogin()
		}
	}

	async function pwdLogin() {
		userStore.Login(loginForm.value).then(res => {
			$modal.closeLoading();
			loginSuccess();
		}).catch(err => {
			$modal.msgError('登录失败，请重试。');
			if (captchaEnabled.value) {
				getCode();
			}
		})
	}

	function loginSuccess(result) {
		userStore.GetInfo().then(res => {
			uni.reLaunch({
				url: '/pages/monitor/monitor'
			})
		})
	}

	function handleUserAgrement() {
		uni.showToast({
			title: '没有用户协议',
			icon: 'none'
		})
	}

	function handlePrivacy() {
		uni.showToast({
			title: '隐私协议还没有',
			icon: 'none'
		})
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.normal-login-container {
		width: 100%;

		.logo-content {
			width: 100%;
			font-size: 21px;
			text-align: center;
			padding-top: 15%;

			image {
				border-radius: 4px;
			}

			.title {
				margin-left: 10px;
			}
		}

		.login-form-content {
			text-align: center;
			margin: 20px auto;
			margin-top: 15%;
			width: 80%;

			.input-item {
				margin: 20px auto;
				background-color: #f5f6f7;
				height: 45px;
				border-radius: 20px;

				.icon {
					font-size: 38rpx;
					margin-left: 10px;
					color: #999;
				}

				.input {
					width: 100%;
					font-size: 14px;
					line-height: 20px;
					text-align: left;
					padding-left: 15px;
				}

			}

			.login-btn {
				margin-top: 40px;
				height: 45px;
			}

			.xieyi {
				color: #333;
				margin-top: 20px;
			}

			.login-code {
				height: 38px;
				float: right;

				.login-code-img {
					height: 38px;
					position: absolute;
					margin-left: 10px;
					width: 200rpx;
				}
			}
		}
	}
</style>