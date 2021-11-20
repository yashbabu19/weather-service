const path = require('path')
const express= require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs= require('hbs') 
const { italic } = require('chalk')

//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))
const app=express()
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs') 
app.set('views',viewsPath)
hbs.registerPartials(partialsPath) 
app.use(express.static(publicDirectoryPath))
 app.get('',(req,res)=>{
     res.render('index',{
         title:'Weather App',
         name:'YASH BABU'
     })
 })
 app.get('/about',(req,res)=>{
    res.render('About',{
        title:'About me',
        name:'YASH BABU'
    })
})
app.get('/help',(req,res)=>{
    res.render('Help',{
        title:'HELP',
        name:'YASH BABU'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.adress){
        return res.send({
             error:'you must provide a adress term'
         })
     }
      geocode(req.query.adress,(error,{latitude,longitude,location}={})=>{
          if(error){
              return res.send({ error })
          }
          forecast(latitude,longitude,(error,forecastData)=>{
              if(error){
               // console.log({error})
                  return res.send({error})
              }
              res.send({
                  forecast: forecastData,
                  location,
                  adress: req.query.adress
              })
          })
      })
     
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'you must provide a search term'
        })
    }
   // console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'forgot it',
        errorMessage:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'forgot it',
        errorMessage:'Page not found'
    })
})
app.listen(3000, ()=>{
    console.log('server is up on port 3000.')
})