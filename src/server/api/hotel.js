let db = require('../db/index')

exports.all = (req, res) => { // 获取全部数据
  var sql = 'select * from hotel'
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}

exports.add = (req, res) => { // 添加数据
    var sql = 'insert into hotel (hotelName,hotelLevel,checkinTime,checkoutTime,roomNumber,adultNumber,childNumber,description) values (?,?,?,?,?,?,?,?)'
    db.query(sql, [req.query.hotelName, req.query.hotelLevel, req.query.checkinTime, req.query.checkoutTime, req.query.roomNumber, req.query.adultNumber, req.query.childNumber, req.query.description], (err, data) => {
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send({
        status: 200,
        message: '添加成功'
      })
    })
  }
