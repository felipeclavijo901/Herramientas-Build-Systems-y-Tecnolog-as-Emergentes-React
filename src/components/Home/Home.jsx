import React from 'react';
import './Home.css'
import request from 'superagent'

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            emailHelp: "",
            passwordHelp: "",
            message: ""
        };
    }

    login = (e) => {

        e.preventDefault();

        let emailValue = this.state.email.value;
        let passwordValue = this.state.password.value;

        //Validate data
        request
            .get('https://la-bodega-55cba.firebaseio.com/users.json')
            .then(res => {
                res.body.find(data => {

                    if ((data.user === emailValue && data.pwd === passwordValue)) {

                        //Create Session
                        sessionStorage.setItem("Session", JSON.stringify({
                            name: data.name,
                            date: new Date(),
                            user: data.user
                        }));
                        this.props.history.push('/store');
                    }

                    this.setState({"message": "Usuario no registrado"});
                    return false;
                });
            });

        return false;
    }

    validateForm = () => {
        let valid = true
        let emailValue = this.state.email.value;
        let passwordValue = this.state.password.value;
        let emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
        let passwordFormat = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{8,}/;

        valid = this.validFields(emailValue, this.state.emailHelp, emailFormat, "Correo electrónico", "Ejemplo: test@test.com");

        if (valid === true)
            valid = this.validFields(passwordValue, this.state.passwordHelp, passwordFormat, "Contraseña");
        else
            this.validFields(passwordValue, this.state.passwordHelp, passwordFormat, "Contraseña", "Mínimo 8 caracteres.");

        if (!valid) {
            return false;
        }
    }

    validFields(field, help, format, name, rules) {
        if (field === "" || field.match(format) === null) {
            help.innerHTML = "El campo de " + name + " es obligatorio, " + rules
            return false
        } else {
            help.innerHTML = ""
            return true
        }
    }

    render() {
        return (
            <div id="container">
                <div>
                    <form className="form-signin" onSubmit={this.login}>
                        <h1 className="h3 mb-3 font-weight-normal text-center">Inicia Sesión</h1>
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" id="email" className="form-control" placeholder="Correo electrónico" required autoFocus=""></input>
                        <small id="emailHelp" className="form-text text-danger"></small>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" className="form-control" pattern="[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{8,}" placeholder="Contraseña" required></input>
                        <small id="passwordHelp" className="form-text text-danger"></small>
                        <button type="submit" className="btn btn-success" onClick={this.validateForm}>Ingresar</button>
                        <label id="message" className="text-danger">{this.state.message}</label>
                    </form>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.setState({
            email: document.getElementById('email'),
            emailHelp: document.getElementById('emailHelp'),
            password: document.getElementById('password'),
            passwordHelp: document.getElementById('passwordHelp')
        });
    }
}

export default Home;