import React, { Component } from "react";
import { signInWithGoogle } from "../../firebase/utils";
import Button from "../Form/Button";
import "./styles.scss";

class SignIn extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="signin">
        <div className="wrap">
          <h2>sign in</h2>
          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
              <div className="socialSignIn">
                <div className="row">
                  <Button onClick={signInWithGoogle}>
                    Sign in With Google
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default SignIn;
