import app from './app.js'
import dbConnection from './config/dbConnection.js'

dbConnection();

app.listen(8080,()=>{
    console.log('server started at port 8080')
})