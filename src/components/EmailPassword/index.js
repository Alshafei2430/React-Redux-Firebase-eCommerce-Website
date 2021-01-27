import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper";
import Button from "../Form/Button";
import FormInput from "../Form/FormInput";
import "./styles.scss";

const initialState = {
  email: "",
  errors: [],
};
class EmailPassword extends Component {
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

    try {
      const { email } = this.state;
      const config = {
        url: "http://localhost:3000/login",
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push("login");
        })
        .catch(() => {
          const err = ["Email not found. Please try again"];
          this.setState({
            errors: err,
          });
        });
    } catch (error) {
      //   console.log(error);
    }
  };
  render() {
    const { email, errors } = this.state;
    const configAuthWrapper = {
      headline: "Email Password",
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
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={this.handleChange}
            />
            <Button type="submit">Reset Password</Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}
export default withRouter(EmailPassword);
