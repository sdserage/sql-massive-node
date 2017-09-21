const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const massive = require("massive");
require("dotenv").config();
const pc = require('./products_controller');

const app = express();
app.use(bodyParser.json());
app.use(cors());

massive(process.env.CONNECTION_STRING).then(dbInstance=>app.set('db',dbInstance));

app.get(`/api/products`,pc.getAll);
app.get(`/api/products/:id`,pc.getOne);
app.put(`/api/products/:id`,pc.update);
app.post(`/api/products`,pc.create);
app.delete(`/api/products/:id`,pc.delete);

const port = process.env.PORT || 3000;
app.listen(port,()=>{console.log(`Server listening on port ${port}...`);});
