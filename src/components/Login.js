import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthProvider } from "../context/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, signin } = useAuthProvider();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  if (currentUser) {
    return <Navigate replace to="/" />;
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError !== "") setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError !== "") setPasswordError("");
  };

  const loginAsTestUser = () =>{
    setEmail("test@gmail.com")
    setPassword("testpass123")
    handleFormSubmit()
  }

  const handleFormSubmit = (e) => {
    e && e.preventDefault();
    if (email && password) {
      setLoading(true);
      signin(email, password)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          if (err.message === "Firebase: Error (auth/user-not-found).") {
            setEmailError("Email not found");
          } else if (err.message === "Firebase: Error (auth/wrong-password).") {
            setPasswordError("Incorrect Password");
          }
          setLoading(false);
        });
    }
  };

  return (
    <div className="container">
      <div className="mt-5 d-flex justify-content-center align-items-center">
        <form className="bg-light p-4 rounded" style={{ width: "500px" }} onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input type="email" className={`form-control ${emailError && "is-invalid"}`} id="email" value={email} onChange={handleEmailChange} />
            <div className="invalid-feedback">{emailError}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className={`form-control ${passwordError && "is-invalid"}`} id="password" value={password} onChange={handlePasswordChange} />
            <div className="invalid-feedback">{passwordError}</div>
          </div>
          <p className="float-end m-0 p-2">
            Forgot Password?{" "}
            <span role="button" className="text-secondary">
              Click here
            </span>
          </p>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Login
            {loading && <span className="ms-3 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
          </button>
          <p className="m-0 pt-4 text-center" onClick={() => navigate("/register")}>
            Don't have an account with us yet?{" "}
            <span role="button" className="text-secondary">
              Register
            </span>
          </p>
          <div className="text-center mt-4">
            { !loading && <button className="btn btn-primary" disabled={loading} onClick={loginAsTestUser}>
              Login as test user
            </button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
