import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { resetAuthForms, signUpUser } from "../../redux/User/user.actions";
import AuthWrapper from "../AuthWrapper";
import Button from "../Form/Button";
import FormInput from "../Form/FormInput";
import "./styles.scss";

const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpErrors,
});

const Signup = (props) => {
  const { signUpError, signUpSuccess } = useSelector(mapState);
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0)
      setErrors(signUpError);
  }, [signUpError]);

  useEffect(() => {
    if (signUpSuccess) {
      resetForm();
      dispatch(resetAuthForms());
      props.history.push("/");
    }
  }, [signUpSuccess]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(signUpUser({ email, password, confirmPassword, displayName }));
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
