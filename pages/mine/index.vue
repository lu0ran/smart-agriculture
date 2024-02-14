<template>
	<view class="mine-container" :style="{height: `${windowHeight}px`}">
		<!--顶部个人信息栏-->
		<view class="header-section">
			<view class="flex padding justify-between">
				<view class="flex align-center">
					<view v-if="!avatar" class="cu-avatar xl round bg-white">
						<view class="iconfont icon-people text-gray icon"></view>
					</view>
					<image v-if="avatar" @click="handleToAvatar" :src="avatar" class="cu-avatar xl round"
						mode="widthFix">
					</image>
					<view v-if="!name" @click="handleToLogin" class="login-tip">
						点击登录
					</view>
					<view v-if="name" @click="handleToInfo" class="user-info">
						<view class="u_title">
							用户名：{{ name }}
						</view>
					</view>
				</view>
				<view v-if="name" @click="handleToInfo" class="flex align-center">
					<text>个人信息</text>
					<view class="iconfont icon-right"></view>
				</view>
			</view>
		</view>

		<view class="content-section">
			<view class="mine-actions grid col-4 text-center">
				<view class="action-item" @click="handleJiaoLiuQun">
					<view class="iconfont icon-friendfill text-pink icon"></view>
					<text class="text">交流群</text>
				</view>
				<view class="action-item" @click="handleBuilding">
					<view class="iconfont icon-service text-blue icon"></view>
					<text class="text">在线客服</text>
				</view>
				<view class="action-item" @click="handleBuilding">
					<view class="iconfont icon-community text-mauve icon"></view>
					<text class="text">反馈社区</text>
				</view>
				<view class="action-item" @click="handleBuilding">
					<view class="iconfont icon-dianzan text-green icon"></view>
					<text class="text">点赞我们</text>
				</view>
			</view>

			<view class="menu-list">
				<view class="list-cell list-cell-arrow" @click="handleToEditInfo">
					<view class="menu-item-box">
						<view class="iconfont icon-user menu-icon"></view>
						<view>编辑资料</view>
					</view>
				</view>
				<view class="list-cell list-cell-arrow" @click="handleHelp">
					<view class="menu-item-box">
						<view class="iconfont icon-help menu-icon"></view>
						<view>常见问题</view>
					</view>
				</view>
				<view class="list-cell list-cell-arrow" @click="handleAbout">
					<view class="menu-item-box">
						<view class="iconfont icon-aixin menu-icon"></view>
						<view>关于我们</view>
					</view>
				</view>
				<view class="list-cell list-cell-arrow" @click="handleToSetting">
					<view class="menu-item-box">
						<view class="iconfont icon-setting menu-icon"></view>
						<view>应用设置</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script setup>
	import storage from '@/utils/storage'
	import {
		storeToRefs
	} from 'pinia'
	import {
		useUserStore
	} from '@/store/user'
	import {
		ref,
		getCurrentInstance
	} from "vue";

	const config = getCurrentInstance().appContext.config.globalProperties.config;
	const $tab = getCurrentInstance().appContext.config.globalProperties.$tab;
	const $modal = getCurrentInstance().appContext.config.globalProperties.$modal;
	const userStore = useUserStore();
	const {
		name,
		avatar
	} = storeToRefs(userStore);
	const version = config.appInfo.version;
	const windowHeight = uni.getSystemInfoSync().windowHeight - 50;

	function handleToInfo() {
		$tab.navigateTo('/pages/mine/info/index')
	}

	function handleToEditInfo() {
		$tab.navigateTo('/pages/mine/info/edit');
	}

	function handleToSetting() {
		$tab.navigateTo('/pages/mine/setting/index')
	}

	function handleToLogin() {
		$tab.navigateTo('/pages/login/index');
	}

	function handleToAvatar() {
		console.log("TOTO");
	}

	function handleLogout() {
		$modal.confirm('确定注销并退出系统么？').then(res => {
			userStore.Logout().then(() => {
				$tab.reLaunch('/pages/index/index')
			})
		})
	}

	function handleHelp() {
		console.log("TOTO");
	}

	function handleAbout() {
		console.log("TOTO");
	}

	function handleJiaoLiuQun() {
		$modal.showToast('无');
	}

	function handleBuilding() {
		$modal.showToast("模块建设中");
	}
</script>


<style lang="scss">
	page {
		background-color: #f5f6f7;
	}

	.mine-container {
		width: 100%;
		height: 100%;


		.header-section {
			padding: 15px 15px 45px 15px;
			background-color: #3c96f3;
			color: white;

			.login-tip {
				font-size: 18px;
				margin-left: 10px;
			}

			.cu-avatar {
				border: 2px solid #eaeaea;

				.icon {
					font-size: 40px;
				}
			}

			.user-info {
				margin-left: 15px;

				.u_title {
					font-size: 18px;
					line-height: 30px;
				}
			}
		}

		.content-section {
			position: relative;
			top: -50px;

			.mine-actions {
				margin: 15px 15px;
				padding: 20px 0px;
				border-radius: 8px;
				background-color: white;

				.action-item {
					.icon {
						font-size: 28px;
					}

					.text {
						display: block;
						font-size: 13px;
						margin: 8px 0px;
					}
				}
			}
		}
	}
</style>