const Api = require('./controls/api')


module.exports = function(app) {
	app.get('/api/seller', Api.seller)
	app.get('/api/goods', Api.goods)
	app.get('/api/ratings', Api.ratings)
}