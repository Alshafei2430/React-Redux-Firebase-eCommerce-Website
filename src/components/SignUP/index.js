import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { auth, handleUserProfile } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper";
import Button from "../Form/Button";
import FormInput from "../Form/FormInput";
import "./styles.scss";

const Signup = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const configAuthWrapper = {
    headline: "Sign UP",
  };

  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      const err = ["Password doesn't match"];
      setErrors(err);
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { displayName });
      resetForm();
      props.history.push("/");
    } catch (err) {
      const { message } = err;
      setErrors([message]);
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
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full name"
            handleChange={(e) => setDisplayName(e.target.value)}
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm password"
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="supmit">Reister</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(Signup);
