import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: this.props.errors,
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

    }

    handleInput(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }


    handleLoginSubmit(e) {
        e.preventDefault();
        this.props.login(this.state)
    }

    render() {

        return (<div className="sessionForm">
            <form>
                <input type="text" value={this.state.email} onChange={this.handleInput('email')} placeholder="email" />
                <input type="password" value={this.state.password} onChange={this.handleInput('password')} placeholder="password" />
                <button onClick={this.handleLoginSubmit}>Login</button>
                <div>{this.state.errors}</div>
            </form>
        </div> )

    }
}

export default LoginForm;