const port = 4001
const express = require("express")
const app = express();
app.use(require("cors")());
app.use(require("morgan")("dev"))
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
const path = require("path")

const htmlTemplates = path.join(__dirname, 'templates');
app.use(require('express').static(path.join(__dirname, 'public')));
const routes = require('./routes')(express.Router(),app)
const frontendRoutes = require('./routes/frontendRoutes')(express.Router(),app,htmlTemplates)
app.use('/api', routes)
app.use('/', frontendRoutes)

app.listen(port, function(){
    console.log(`app is listening on port ${port}`);
    console.log(`access url: http://localhost:${port}`);
})