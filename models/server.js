import express, { json } from 'express'
import dbConnection from '../database/config.js'
import cuentaRouter from '../routes/cuentaRoute.js'

class Server{
    constructor(){
    this.app = express()
    this.listen()
    this.dbConnection()
    this.pathCuenta = "/api/cuenta"
    this.route()
    
    }

    route (){
        this.app.use(json())
        this.app.use(this.pathCuenta, cuentaRouter)
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running`)
        })
    }

    async dbConnection(){ // call connet to database
        await dbConnection()
    }
}

export default Server