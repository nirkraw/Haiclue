import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            hidden: true, 
            bgToggled: false
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
    }

    handleInput(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleDemoSubmit(e) {
        e.preventDefault();
        const user = e.currentTarget.getAttribute('value');
        this.props.login({
            email: user,
            password: 'password',
        })
    }

    toggleDropDown() {
        this.setState({hidden: !this.state.hidden, bgToggled: !this.state.bgToggled});
    }

    handleLoginSubmit(e) {
        e.preventDefault();
        this.props.login(this.state)
    }

    render() {

        let display; 
        if (this.state.hidden) {
            display = 'hidden';
        } else {
            display = null;        
        }

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
                <ul className="session-form-errors">{loginErrors}</ul>

            </form>

                <button onClick={this.handleLoginSubmit}>Login</button>
                <button id='EZ' onClick={this.toggleDropDown}>
                    <ul className='EZ-login-dropdown'>
                        <li className='button-dropdown'><span>Quick Login</span><span className="down-arrow">▼</span></li>
                        <ul className={`dropdown-toggle ${display}`}>
                            <li value="john@john.com" onClick={this.handleDemoSubmit}>John</li>
                            <li value="nancy@nancy.com" onClick={this.handleDemoSubmit}>Nancy</li>
                            <li value="sophia@sophia.com" onClick={this.handleDemoSubmit}>Sophia</li>
                            <li value="andre@andre.com" onClick={this.handleDemoSubmit}>Andre</li>
                            <li value="nicole@nicole.com" onClick={this.handleDemoSubmit}>Nicole</li>
                            <li value="simon@simon.com" onClick={this.handleDemoSubmit}>Simon</li>
                            <li value="james@james.com" onClick={this.handleDemoSubmit}>James</li>
                            <li value="bart@bart.com" onClick={this.handleDemoSubmit}>Bartholomew</li>
                            <li value="eduardo@eduardo.com" onClick={this.handleDemoSubmit}>Eduardo</li>
                            <li value="angela@angela.com" onClick={this.handleDemoSubmit}>Angela</li>
                            <li value="alex@alex.com" onClick={this.handleDemoSubmit}>Alex</li>
                            <li value="jasmine@jasmine.com" onClick={this.handleDemoSubmit}>Jasmine</li>
                            <li value="paul@paul.com" onClick={this.handleDemoSubmit}>Paul</li>
                            <li value="samantha@samantha.com" onClick={this.handleDemoSubmit}>Samantha</li>
                        </ul>
                    </ul>
                </button>
        </div> )

    }
}

export default LoginForm;