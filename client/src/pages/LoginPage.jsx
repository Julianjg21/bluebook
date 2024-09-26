import React, { useContext } from "react";
import AuthContainer from "../components/login/AuthContainer";
import { RenderContext } from "../hooks/contexts/renderContext";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/login/RegisterForm";

function LoginPage() {
  const { component } = useContext(RenderContext);

  return (
    <div className="background-image align-content-center ">
       <div className="row ">
        <div className="col-1 col-md-3"></div>
       {/*The received component is rendered in the global state */}
       <div className="col-10 col-md-6 mb-5">  {component === "LoginForm" ? (
          <LoginForm />
        ) : component === "RegisterForm" ? (
          <RegisterForm />
        ) : (
          <AuthContainer />
        )}</div>
       <div className="col-1 col-3"></div>
      
       </div>
        
    
    </div>
  );
}

export default LoginPage;
