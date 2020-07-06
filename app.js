const express = require('express')

const path = require('path')

const hbs = require('hbs')

const geocode = require('./src/utils/geocode')

const forecast = require('./src/utils/forecast')


const app = express()
//Define path for express configuration
const PublicDirectory = path.join(__dirname, './public')

const viewPath = path.join(__dirname, './template/views')

const partialsPath = path.join(__dirname,'./template/partials')



//Setup handle bar engine and views location
app.set('view engine', 'hbs')

app.set('views', viewPath)

hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(PublicDirectory))


//
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        Name: 'Ayush'

    })
})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About',
        Name:'Ayush'
    })

})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        Name:'Ayush'

    })
})




app.get('/weather', (req, res) => {

    if (!req.query.address)
        return res.send({ error: "Error" })


    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })





    /*res.send({

        location: "Kanpur",

        forecast: "Sunny",

        temperature: "42",

        address: req.query.address

    }) */


})


app.get('/help/*', (req, res) => {
    res.render('404', {
        ErrorMessage: "Help Article Not Found",
        Name:"Ayush"
    })
})


app.get('/product', (req, res) => {
    console.log(req.query)
    res.send({})
    
})


app.get('*', (req, res) => {
    res.render('404', {
        ErrorMessage: "Page Not Found",
        Name:"Ayush"
    })
})



app.listen(3000, () => {
    console.log('Port is listening at 3000')
})