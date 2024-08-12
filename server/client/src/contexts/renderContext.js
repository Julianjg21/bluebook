import React, { createContext, useState } from "react";

const RenderContext = createContext();

const RenderProvider = ({ children }) => {
  const [component, setComponent] = useState("AuthContainer");

  const renderComponent = (param) => {
    switch (param) {
      case "AuthContainer":
        setComponent("AuthContainer");
        break;

      case "LoginForm":
        setComponent("LoginForm");
        break;

      case "RegisterForm":
        setComponent("RegisterForm");
        break;

      default:
        break;
    }
  };

  return (
    <RenderContext.Provider value={{ component, renderComponent }}>
      {children}
    </RenderContext.Provider>
  );
};

export { RenderProvider, RenderContext };
