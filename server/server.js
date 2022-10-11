const express = require('express')
const cors = require('cors')
//configuration file
require('./config/mongoose.config')
const app = express()
const PORT = 8000




// Middleware along with cors to allow front end and back end to communicate with each other
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({origin: 'http://localhost:3000',}));

// import routes
const Routes = require('./routes/pet.routes')
Routes(app)



app.listen(PORT,()=>{
    console.log(`Server is up on port ${PORT}`)
})