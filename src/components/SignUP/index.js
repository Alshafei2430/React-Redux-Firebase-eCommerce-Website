import React, { Component } from "react";
import { auth, handleUserProfile } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper";
import Button from "../Form/Button";
import FormInput from "../Form/FormInput";
import "./styles.scss";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

class Signup extends Component {
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
  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      const err = ["Password doesn't match"];
      this.setState({
        errors: err,
      });
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { displayName });
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
    const {
      displayName,
      email,
      password,
      confirmPassword,
      errors,
    } = this.state;
    const configAuthWrapper = {
      headline: "Sign UP",
    };
    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => {
                return <li key={index}>{err}</li>;
              })}
            </ul>
          )}
          <form onSubmit={this.handleFormSubmit}>
            <FormInput
              type="text"
              name="displayName"
              value={displayName}
              placeholder="Full name"
              handleChange={this.handleChange}
            />
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
            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm password"
              handleChange={this.handleChange}
            />
            <Button type="supmit">Reister</Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}
export default Signup;
