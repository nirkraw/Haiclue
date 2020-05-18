import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
        this.handleDemoSubmit2 = this.handleDemoSubmit2.bind(this);
        this.handleDemoSubmit3 = this.handleDemoSubmit3.bind(this);
        this.handleDemoSubmit4 = this.handleDemoSubmit4.bind(this);
    }

    handleInput(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleDemoSubmit(e) {
        e.preventDefault();
        this.props.login({
            email: 'john@john.com',
            password: 'password',
        })
    }

    handleDemoSubmit2(e) {
        e.preventDefault();
        this.props.login({
            email: 'bart@bart.com',
            password: 'password',
        })
    }

    handleDemoSubmit3(e) {
        e.preventDefault();
        this.props.login({
            email: 'paul@paul.com',
            password: 'password',
        })
    }

    handleDemoSubmit4(e) {
        e.preventDefault();
        this.props.login({
            email: 'james@james.com',
            password: 'password',
            errors: this.props.errors,
        })
    }


    handleLoginSubmit(e) {
        e.preventDefault();
        this.props.login(this.state)
    }

    render() {

        let loginErrors; 
        if (this.props.errors.loginErrors) {
            debugger; 
            loginErrors = Object.values(this.props.errors.loginErrors).map( error => {
                return (<li>{error}</li>)
            });
        }

        debugger; 

        return (<div className="session-form">
            <form>
                <h2 id="logIn">Log In</h2>
                <input type="text" value={this.state.email} onChange={this.handleInput('email')} placeholder="Email" />
                <input type="password" value={this.state.password} onChange={this.handleInput('password')} placeholder="Password" />
                <br />
                <button onClick={this.handleLoginSubmit}>Login</button>
                <ul>{loginErrors}</ul>
            </form>
            <button onClick={this.handleDemoSubmit} >John Login</button>
            <button onClick={this.handleDemoSubmit2} >Bart Login</button>
            <button onClick={this.handleDemoSubmit3} >Paul Login</button>
            <button onClick={this.handleDemoSubmit4} >James Login</button>

        </div> )

    }
}

export default LoginForm;