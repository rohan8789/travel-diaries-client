import { useState, useCallback, createContext } from "react";

export const AuthContext = createContext({
  toggle: false,
  isLoggedIn: false,
  token:null,
  uid:null,
  login: () => {},
  logout: () => {},
  changeToggle:() => {}
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [uid, setUId] = useState(null);
  const login = useCallback((uid, token) => {
    setToken(token);
    setUId(uid);
    localStorage.setItem('userData', JSON.stringify({userId:uid, token:token}));
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUId(null);
    localStorage.removeItem('userData');
  }, []);
  
  const changeToggle = () => {
    setToggle(!toggle);
  };
  return (
    <AuthContext.Provider
      value={{ toggle, isLoggedIn:!!token, token, uid, login, logout, changeToggle }}
    >
      {children}
    </AuthContext.Provider>
  );
};
