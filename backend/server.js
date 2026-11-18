require('dotenv').config();
const express = require('express');
const app = express()
const port = process.env.PORT;
const db = require('./config/database');
const unitRouters = require('./routers/unit.routers');

app.use(express.json());
app.use('api',unitRouters);

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