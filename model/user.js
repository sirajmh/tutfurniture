const backend = require("../backend/user")({})
module.exports = function(props){
    return {
        save: saveUser,
        processLogin
    }
}


async function saveUser(req, res){
    const payload = req.body
    const options = await backend.saveUser(payload)
    res.send(options)
}

async function processLogin(req, res){
    const payload = req.body
    const emailResponse = await backend.verifyUserEmail(payload)
    if(emailResponse.status != 200){
        return res.status(emailResponse.status).send(emailResponse)
    }
    const options = await backend.verifyUserPassword(payload)
    if(options.status != 200){
        return res.status(options.status).send(options)
    }
    console.log(options.response[0]);
    const token = generateToken(options.response[0]);
    res.status(200).send({status: 200, access_token:token, error: null })
    
}


var jwt = require('jsonwebtoken');
generateToken = function(payload){
    
    let objPayload = {
        id: payload.id,
        name: payload.full_name,
        email: payload.email,
        phone: payload.phone,
        user_type: payload.user_type
    }

    console.log(objPayload)
    var token = jwt.sign( objPayload, 'secret', {expiresIn: '1d'});
    return token
}