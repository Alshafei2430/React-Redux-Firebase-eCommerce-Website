import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth, signInWithGoogle } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper";
import Button from "../Form/Button";
import FormInput from "../Form/FormInput";
import "./styles.scss";

const initialState = {
  email: "",
  password: "",
  errors: [],
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (err) {
      const { message } = err;
      this.setState({
        errors: [message],
      });
    }
  };
  render() {
    const { email, password } = this.state;
    const configAuthWrapper = {
      headline: "Log In",
    };
    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={this.handleChange}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              handleChange={this.handleChange}
            />
            <Button type="submit">Log In</Button>

            <div className="socialSignIn">
              <div className="row">
                <Button onClick={signInWithGoogle}>Sign in With Google</Button>
              </div>
            </div>
            <div className="links">
              <Link to="/recovery">Reset Password</Link>
            </div>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}
export default SignIn;
