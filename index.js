const express = require('express');
require('dotenv').config();
const cors = require('cors');
const videoRoutes = require('./routes/videos');


const app = express();

app.use(cors());

app.use(express.json());

// app.use(express.static('./public'));

app.use("/videos", videoRoutes );

const SERVER_PORT= process.env.PORT || 3000;

app.listen(SERVER_PORT,()=>{
console.log(`server is listening on ${SERVER_PORT}`)
});