const mongoose = require('mongoose')
const express = require('express')
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

const app = express()

AdminBro.registerAdapter(AdminBroMongoose)

const User = mongoose.model('User' , {
    email : { type : String , required : true },
    password : { type : String , required : true },
    role : { type : String , enum : [ 'admin' , 'restricted' ] , required : true }
})

const adminBro = new AdminBro({
    resources : [User] ,
    rootPath : '/admin' ,
})

const router =  AdminBroExpressjs.buildRouter(adminBro)
app.use( adminBro.options.rootPath , router )

const run = async () => {
    await mongoose.connect( 'mongodb://localhost:27017/test' , { useNewUrlParser : true , useUnifiedTopology: true } )
    await app.listen( 8080 , () => { console.log( 'Listening' ) } )
}

run() 