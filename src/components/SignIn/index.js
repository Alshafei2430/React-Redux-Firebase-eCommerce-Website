import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth, signInWithGoogle } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper";
import Button from "../Form/Button";
import FormInput from "../Form/FormInput";
import "./styles.scss";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
      props.history.push("/");
    } catch (err) {
      const { message } = err;
      setErrors([message]);
    }
  };

  const configAuthWrapper = {
    headline: "Log In",
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
        <form onSubmit={handleSubmit}>
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
};

export default withRouter(SignIn);
