<template>
	<view class="container">
		<view class="ub">
			{{name}}
		</view>
	</view>

</template>

<script setup>
	import {
		ref
	} from "vue";
	const name = ref("134");
</script>

<style scoped>
	.container {
		height: 100%;
		width: 100%;
	}

	.ub {
		background-color: white;
		margin: 2%;
		border-radius: 3%;
		height: 500px;
	}
</style>