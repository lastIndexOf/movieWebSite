const data = require('../../data.json')

exports.seller = (req, res) => {
  res.json({
    errno: 0,
    data: data.seller
  })
}

exports.ratings =  (req, res) => {
  res.json({
    errno: 0,
    data: data.ratings
  })
}

exports.goods = (req, res) => {
  res.json({
    errno: 0,
    data: data.goods
  })
}
