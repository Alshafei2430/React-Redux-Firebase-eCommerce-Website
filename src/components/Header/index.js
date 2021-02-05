import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import Logo from "./../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserStart } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const Header = (props) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart());
  };
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="SimpleTut Logo" />
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>
        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">My Account</Link>
              </li>
              <li>
                <Link onClick={() => signOut()}>Log Out</Link>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li>
                <Link to="/registeration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
