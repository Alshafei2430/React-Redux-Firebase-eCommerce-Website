import { useAdminAuth } from "../customeHooks";

const WithAdminAuth = (props) => useAdminAuth(props) && props.children;

export default WithAdminAuth;
