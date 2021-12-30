let mysql = require("mysql");
let pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "sys",
});
module.exports = {
    sqlConnect: function (sql, sqlArr, callBack) {
        pool.getConnection((err, conn) => {
            console.log("链接数据库")
            if (err) {
                console.log("链接失败")
                return;
            }

            conn.query(sql, sqlArr, callBack)
            //释放链接
            conn.release()
        })
    }
}