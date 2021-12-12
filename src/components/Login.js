import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if(emailError !== "") setEmailError("");
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if(passwordError !== "") setPasswordError("")
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log({
            email,
            password
        })
    }

  return (
    <div className="container">
      <div className="mt-5 d-flex justify-content-center align-items-center">
        <form className="bg-light p-4 rounded" style={{width: "500px"}} onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input 
                type="email" 
                className={`form-control ${emailError && "is-invalid"}`} 
                id="email" 
                value={email}
                onChange={handleEmailChange}
            />
            <div className="invalid-feedback">{emailError}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
                type="password" 
                className={`form-control ${passwordError && "is-invalid"}`} 
                id="password" 
                value={password}
                onChange={handlePasswordChange}
            />
            <div className="invalid-feedback">{passwordError}</div>
          </div>
          <p className="float-end m-0 p-2">Forgot Password? <span role="button" className="text-secondary">Click here</span></p>
          <button type="submit" className="btn btn-primary">Login</button>
          <p className="m-0 pt-4 text-center" onClick={()=>navigate("/register")}>
              Don't have an account with us yet? <span role="button" className="text-secondary">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
