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
    }

    handleInput(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleDemoSubmit(e) {
        e.preventDefault();
        const select = document.getElementById("EZ")
        const user = select.options[select.selectedIndex].value;
        this.props.login({
            email: user,
            password: 'password',
        })
    }

    handleLoginSubmit(e) {
        e.preventDefault();
        this.props.login(this.state)
    }

    render() {

        let loginErrors; 
        if (this.props.errors) {
            // debugger
            loginErrors = Object.values(this.props.errors).map( error => {
                return (<li>{error}</li>)
            });
        }


        return (<div className="session-form">
            <form>
                <h2 id="logIn">Log In</h2>
                <input type="text" value={this.state.email} onChange={this.handleInput('email')} placeholder="Email" />
                <input type="password" value={this.state.password} onChange={this.handleInput('password')} placeholder="Password" />
                <br />
                <button onClick={this.handleLoginSubmit}>Login</button>
                <ul>{loginErrors}</ul>
            </form>
            <button>

            <select name="EZ Login" id="EZ" onChange={this.handleDemoSubmit} placeholder="EZ Login" >
                <option value="">EZ Login</option>
                <option value="john@john.com">John</option>
                <option value="nancy@nancy.com">Nancy</option>
                <option value="sophia@sophia.com">Sophia</option>
                <option value="andre@andre.com">Andre</option>
                <option value="nicole@nicole.com">Nicole</option>
                <option value="simon@simon.com">Simon</option>
                <option value="james@james.com">James</option>
                <option value="bart@bart.com">Bartholomew</option>
                <option value="eduardo@eduardo.com">Eduardo</option>
                <option value="angela@angela.com">Angela</option>
                <option value="alex@alex.com">Alex</option>
                <option value="jasmine@jasmine.com">Jasmine</option>
                <option value="paul@paul.com">Paul</option>
                <option value="samantha@samantha.com">Samantha</option>
            </select>
            </button>

        </div> )

    }
}

export default LoginForm;