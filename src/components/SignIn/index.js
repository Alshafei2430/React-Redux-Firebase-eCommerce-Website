import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../redux/User/user.actions";
import { Link, useHistory } from "react-router-dom";
import AuthWrapper from "../AuthWrapper";
import Button from "../Form/Button";
import FormInput from "../Form/FormInput";
import "./styles.scss";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

const SignIn = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentUser, userErr } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) setErrors(userErr);
  }, [userErr]);

  const handleEmailSignInSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    dispatch(googleSignInStart());
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
        <form>
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
          <Button onClick={handleEmailSignInSubmit}>Log In</Button>

          <div className="socialSignIn">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>Sign in With Google</Button>
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

export default SignIn;
