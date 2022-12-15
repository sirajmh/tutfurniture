

module.exports = function(router, expressApp, htmlTemplates){
    const props = {templatePath: htmlTemplates}
    const frontendModel = require("../model/frontend")(props)
   
    router.get("/",frontendModel.index)
    router.get("/login",frontendModel.login)
    return router
}