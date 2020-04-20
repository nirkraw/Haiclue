import React from 'react';


class CreateSessionForm extends React.Component {
    constructor(props) {
        this.state = {
            username: '',
            password: '',
            errors: this.props.errors,
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleLoginSubmit(e) {
     e.preventDefault();
     this.this.props.login(this.state)   
    }

    handleSignupSubmit(e) {
        e.preventDefault();
        this.this.props.signup(this.state)
    }

    render () {

    return (
        <>
        <div>
            <form>
                <input type="text" value={this.state.username} onChange={this.handleInput('username')} placeholder="username"/>
                <input type="password" value={this.state.password} onChange={this.handleInput('password')}  placeholder="password"/>
                <button onClick={this.handleSignupSubmit}>Signup</button>
                <div>{this.state.errors}</div>
            </form>
        </div>
        <br/>
        <div>
            <form>
                <input type="text" value={this.state.username} onChange={this.handleInput('username')}  placeholder="username"/>
                <input type="password" value={this.state.password} onChange={this.handleInput('password')}  placeholder="password"/>
                <button onClick={this.handleLoginSubmit}>Login</button>
                <div>{this.state.errors}</div>
            </form>
        </div>
        </>)
    
    }

}


