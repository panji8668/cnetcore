const { default: axios } = require("axios");

class CNet {
    constructor() {
        this.http = axios.create({
            timeout: 60000,
        })
    }
    async inq(req) {

        try {
            var pdata = {
                id: req.query.id,
                pin: req.query.pin,
                user: req.query.user,
                pass: req.query.pass,
                vtype: req.query.kode,
                tujuan: req.query.tujuan,
                trxid: req.query.trxid
            }
            console.log(`${req.query.kode} CEK REQUEST`);
            console.log(JSON.stringify(pdata));
            let resp = await this.http.post(process.env.BASEURL + '/omnicheck', pdata);
            console.log(`${req.query.kode} CEK RESPONSE`);
            console.log(JSON.stringify(resp.data));
            return {
                data: resp.data,
                totalbayar: parseInt(process.env.ADMIN) + parseInt(resp.data.amount)
            }
        } catch (error) {
            console.log(error.response.data)
            return false
        }

    }
    async pay(req, bayar) {
        try {
            var pdata = {
                id: req.query.id,
                pin: req.query.pin,
                user: req.query.user,
                pass: req.query.pass,
                vtype: req.query.kode,
                tujuan: req.query.tujuan,
                trxid: req.query.trxid,
                tagihan: parseInt(bayar)-parseInt(process.env.ADMIN) 

            }
            console.log(`${req.query.kode} CEK REQUEST`);
            let respinq = await this.http.post(process.env.BASEURL + '/omnicheck', pdata);
            console.log(`${req.query.kode} CEK RESPONSE`);

            console.log(`${req.query.kode} PAYMENT REQUEST`);
            console.log(JSON.stringify(pdata));
            let resp = await this.http.post(process.env.BASEURL + '/pay', pdata);
            console.log(`${req.query.kode} PAYMENT RESPONSE`);
            return resp.data
        } catch (error) {
            console.log(error);
            return false
        }
    }
}

module.exports = CNet;