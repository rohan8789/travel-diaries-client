import { useState, useCallback, createContext } from "react";

export const AuthContext = createContext({
  toggle: false,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  changeToggle:() => {}
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toggle, setToggle] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn((isLoggedIn)=>!isLoggedIn);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn((isLoggedIn)=>false);
  }, []);

  const changeToggle = () => {
    setToggle(!toggle);
  };
  return (
    <AuthContext.Provider
      value={{ toggle, isLoggedIn, login, logout, changeToggle }}
    >
      {children}
    </AuthContext.Provider>
  );
};
