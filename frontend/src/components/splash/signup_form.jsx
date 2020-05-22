import React from "react";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      password: "",
      password2: "",
      email: "",
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
  }

  handleInput(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSignupSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state).then(() => {
      let logInEmail = document.getElementById("Log In Email");
      let logInPassword = document.getElementById("Log In Password");
      logInEmail.value = this.state.email;
      logInPassword.value = this.state.password;
    });

    // this.setState({
    //   handle: "",
    //   password: "",
    //   password2: "",
    //   email: "",
    // });
  }

  //   handleSignupSubmit(e) {
  //     e.preventDefault();
  //     this.props.signup(this.state);
  //   }

  render() {
    let signUpErrors;
    if (this.props.errors) {
      signUpErrors = Object.values(this.props.errors).map((error, idx) => {
        return <li key={idx}>{error}</li>;
      });
    }

    return (
      <>
        <div className="session-form">
          <form>
            <h2 id="signUp">Sign Up</h2>
            <input
              type="text"
              value={this.state.handle}
              onChange={this.handleInput("handle")}
              placeholder="Username"
            />
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleInput("email")}
              placeholder="Email"
            />
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleInput("password")}
              placeholder="Password"
            />
            <input
              type="password"
              value={this.state.password2}
              onChange={this.handleInput("password2")}
              placeholder="Confirm Password"
            />
          </form>
          <ul className="session-form-errors">{signUpErrors}</ul>
          <button onClick={this.handleSignupSubmit}>Signup</button>
        </div>
      </>
    );
  }
}

export default SignupForm;
