const path = require("path")
var template;
module.exports = function({templatePath}){
    template = templatePath
    return {
        index: indexRender,
        login: loginRender
    }
}


function indexRender(req, res){
    res.sendFile(path.join(template, "index.html"))
}

function loginRender(req, res){
    res.sendFile(path.join(template, "login.html"))
}