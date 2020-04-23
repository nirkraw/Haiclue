import React from 'react';
import '../css/session.css';

class SignupForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // login_email: '',
            // login_password: '',
            handle: '',
            password: '',
            password2: '',
            email: '',
            // errors: {}
            errors: this.props.errors,
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    }

    handleInput(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }


    handleSignupSubmit(e) {
        e.preventDefault();
        this.props.signup(this.state)
    }

    render () {

    return (
        <>
            <div className="sessionForm">
                <form>
                    <input type="text" value={this.state.handle} onChange={this.handleInput('handle')} placeholder="username"/>
                    <input type="text" value={this.state.email} onChange={this.handleInput('email')} placeholder="email"/>
                    <input type="password" value={this.state.password} onChange={this.handleInput('password')}  placeholder="password"/>
                    <input type="password" value={this.state.password2} onChange={this.handleInput('password2')}  placeholder="password"/>
                    <button onClick={this.handleSignupSubmit}>Signup</button>
                    <div>{this.state.errors}</div>
                </form>
            </div>
        </>)
    
    }

}


export default SignupForm;

