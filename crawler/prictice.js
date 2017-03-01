//依赖
const co = require('co')
		, request = require('superagent')
		, fs = require('fs')
		, cheerio = require('cheerio')
		// , _pro = require('bluebird')

//核心操作
let notcraweds = []
	, hascraweds = []
	, url = 'https://www.zhihu.com/'

co(asyncAnaly(url))

//函数

//Generator流程
function* asyncAnaly(url) {
	let html = yield getHTML(url)
	console.log(html)
}
//抓取页面
function getHTML(url) {
	return new Promise((resolve, reject) => {
		request.get(url)
				.end((err, res) => {
					if (err)
						return reject(err)

					resolve(res.text)
				})
	})
}

//分析页面