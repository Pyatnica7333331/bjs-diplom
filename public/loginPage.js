"use strict"
let userForm = new UserForm();
userForm.loginFormCallback = (data) => { 
    ApiConnector.login(data, serverResponse => {
        if(serverResponse.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(serverResponse.error);
        };
    });
};
userForm.registerFormCallback = (data) => { 
    ApiConnector.register(data, serverResponse => {
        if(serverResponse.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(serverResponse.error);
        }
    });
};