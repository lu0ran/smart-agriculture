export const request2 = (config, contentType) => {

	config.url = 'http://localhost:8080' + config.url;
	config.methods = config.methods;

	if (!config.data) {
		config.data = {};
	}

	let promise = new Promise(function(resolve, reject) {
		uni.request(config).then(responses => {
			// 异常
			if (responses[0]) {
				reject({
					message: "网络超时"
				});
			} else {

			}
		}).catch(error => {
			reject(error);
		})
	})
	return promise;
};