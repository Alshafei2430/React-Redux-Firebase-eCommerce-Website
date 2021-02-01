import { withRouter } from "react-router-dom";
import { useAuth } from "../customeHooks";

const WithAuth = (props) => useAuth(props) && props.children;

export default withRouter(WithAuth);
