//OM GAN GANAPATHAYE NAMO NAMAH 
//JAI SHRI RAM 
//JAI BAJRANGBALI 
//AMME NARAYANA, DEVI NARAYANA, LAKSHMI NARAYANA, BHADRE NARAYANA
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
//create api routes 
const liveCases = require('./routes/liveCases');
const India = require('./routes/India');
app.use('/India', India);
app.use('/liveCases', liveCases);   
app.listen(port, () => {
    console.log("Server has started at port - " + port);
})
