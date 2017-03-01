
const co = require('co')

let unUrls = new Set([])
	, i = 0
	, firsturl = 'http://zfkandu.zicp.io'

co(anylUrl(firsturl))

function* anylUrl(url) {

	let urls = []
	yield pro(url)

	for (let unurl of unUrls) {
		yield Promise
			.all([pro('1'), pro('2'), pro('3'), pro('4'), pro('5')])
	}

}

function pro(url) {
	return new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log('正在..' + url)
				unUrls.add(firsturl + '/' + i)
				unUrls.add(firsturl + '/' + i + 1)
				unUrls.add(firsturl + '/' + i + 2)
				unUrls.add(firsturl + '/' + i + 3)
				unUrls.add(firsturl + '/' + i + 4)
				unUrls.delete(url)
				i++
				resolve(i)
			}, 1500)
	}) 
}