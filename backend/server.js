require('dotenv').config();
const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT;
const db = require('./config/database');
const routers = require('./routers/index');

app.use(cors());  
app.use(express.json());
app.use('/api',routers);

async function start(){
  try {
    await db.authenticate();
    await db.sync();
    app.listen(port,()=>{
      console.log("BE Started");
    })
  } catch (error) {
    console.error('DB Failed connected',error.message);
  }
}

start();