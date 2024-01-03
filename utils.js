const utils = {};
utils.beginTransaction = async (req) => {
    return new Promise(function (resolve, reject) {
        req.getConnection((err, conn) => {
            conn.query('START TRANSACTION', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    });
}

utils.commit = async (req) => {
    return new Promise(function (resolve, reject) {
        req.getConnection((err, conn) => {
            conn.query('COMMIT', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    });
}

utils.rollback = async (req) => {
    return new Promise(function (resolve, reject) {
        req.getConnection((err, conn) => {
            conn.query('ROLLBACK', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    });
}

utils.runQuerySelectPromise = async (req, sql, param) => {
    return new Promise(function (resolve, reject) {
        req.getConnection((err, conn) => {

            conn.query(sql, param, (err, rows) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    });
}

utils.runQuerySelect = async (req, sql, param) => {
    req.getConnection((err, conn) => {
        conn.query(sql, param, (err, rows) => {
            if (err) {
                console.log(err);
                return (err);
            } else {
                return rows;
            }
        });
    });

}

module.exports = utils;
