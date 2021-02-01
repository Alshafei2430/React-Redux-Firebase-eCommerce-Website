import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { resetAuthForms, resetPassword } from "../../redux/User/user.actions";
import AuthWrapper from "../AuthWrapper";
import Button from "../Form/Button";
import FormInput from "../Form/FormInput";
import "./styles.scss";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordErrors: user.resetPasswordErrors,
});

const EmailPassword = (props) => {
  const { resetPasswordSuccess, resetPasswordErrors } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [configAuthWrapper, setConfigAuthWrapper] = useState({
    headline: "Email Password",
  });

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetAuthForms());
      props.history.push("/login");
    }
  }, [resetPasswordSuccess]);
  useEffect(() => {
    if (Array.isArray(resetPasswordErrors) && resetPasswordErrors.length > 0) {
      setErrors(resetPasswordErrors);
    }
  }, [resetPasswordErrors]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(resetPassword({ email }));
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
