
//handle errors
module.exports.handleAuthErrors = (err) => {
    //console.log(err.message, err.code);
    let errors = {firstName: '', lastName: '', email: '', password: ''};

    //incorrect login
    if(err.message === "incorrect login"){
        errors.password = "Incorrect email or password";
    }

    //duplicate error codes
    if(err.code == 11000){
        errors.email = "Email has already been registered";
        return errors;
    }

    //validation errors
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            //console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}