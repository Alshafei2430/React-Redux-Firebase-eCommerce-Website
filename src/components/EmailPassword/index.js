import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper";
import Button from "../Form/Button";
import FormInput from "../Form/FormInput";
import "./styles.scss";

const EmailPassword = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [configAuthWrapper, setConfigAuthWrapper] = useState({
    headline: "Email Password",
  });
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const config = {
        url: "http://localhost:3000/login",
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push("login");
        })
        .catch(() => {
          const err = ["Email not found. Please try again"];
          setErrors(err);
        });
    } catch (error) {
      //   console.log(error);
    }
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
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Reset Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};
export default withRouter(EmailPassword);
