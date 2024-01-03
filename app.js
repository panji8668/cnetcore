require('dotenv').config()
const mysql = require('mysql')
const myConnection = require('express-myconnection')
var express = require('express');
const CNet = require('./cnet');
const utils = require('./utils');
var app = express()

app.use(
    myConnection(
        mysql,
        {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
        },
        'request',
    ),
)
app.get("/cnetcore/trx", async (req, res) => {

    let cnet = new CNet();
    
    var tipetrx = req.query.tipe;
    if(typeof tipetrx == 'undefined'){
         res.json({ success: false, msg: "tipetrx kesalahan" });return;
    }
    if (parseInt(tipetrx) == 5) {
        let resp = await cnet.inq(req);
        res.json(resp)
    } else {
        try {
            let jmlbayar = await utils.runQuerySelectPromise(req, "select jumlahtagihan from tagihanppob where idpelanggan=? order by idtagihan desc limit 1 ", [req.query.tujuan]);
            if(jmlbayar.length>0){
                let resp = await cnet.pay(req, jmlbayar[0].jumlahtagihan);
                res.json({ success: true, data: resp })
            }else{
                 res.json({ success: false, tujuan:req.query.tujuan, msg:"data inquiry tidak ada",})
            }
        } catch (error) {
            console.log(error);
            res.json({ success: false, msg: "terjadi kesalahan" })
        }
    }
});


var port = process.env.PORT || 8080

app.listen(port, () => console.log(`H2H API Started ${port}`))
