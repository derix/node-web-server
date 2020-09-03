const path = require('path')
const express = require('express')
const weather = require('./utils/weather')

const app = express()
app.use(express.static(path.join(__dirname,'../public')))

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error: 'weather page!'})
    }
    weather.forecast(req.query.address, (error, data) => {
        if(error){
            res.send(error)
        }else{
            res.send(data)
        }
        
    })
}) 

app.get('*', (req, res) => {
    res.send('404 Page Not Found!!!')
}) 

app.listen(3000, () => {
    console.log('server running...')
})  

