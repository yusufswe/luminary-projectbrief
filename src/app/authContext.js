const { createContext } = require("react");

const AuthContext = createContext({
  auth: false,
  login: () => {},
  logout: () => {},
});

export default AuthContext;