const express = require('express')
const app = express()
const todoroute= require('./routes/todoroute')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/public',express.static(__dirname+'/public'))//denotes no get or post request on public nor denotes then on going to /public path in url u will get resources 
//!Cannot GET /public/
//denotes that resources has been suplied to path public and can get it on demand

app.use('/todos',todoroute)

app.get('/',function (req,res,next) {
    res.sendFile(__dirname+'/index.html')
})

app.listen(3000, () => console.log(`Example app listening on port 3000!`))