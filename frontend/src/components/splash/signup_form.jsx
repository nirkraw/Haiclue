import React from 'react';

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
        this.props.signup(this.state).then(() => {this.props.login(this.state)})
    }

    render () {

    return (
        <>
            <div className="session-form">
                <form>
                    <h2>Sign Up</h2>
                    <input type="text" value={this.state.handle} onChange={this.handleInput('handle')} placeholder="Username"/>
                    <input type="text" value={this.state.email} onChange={this.handleInput('email')} placeholder="Email"/>
                    <input type="password" value={this.state.password} onChange={this.handleInput('password')}  placeholder="Password"/>
                    <input type="password" value={this.state.password2} onChange={this.handleInput('password2')}  placeholder="Confirm Password"/>
                    <br/>
                    <button onClick={this.handleSignupSubmit}>Signup</button>
                    <div>{this.state.errors}</div>
                </form>
            </div>
        </>)
    
    }

}


export default SignupForm;

