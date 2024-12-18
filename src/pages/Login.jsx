import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import '../styles/Login.css';
import { GuestNavbar } from "../components/Navbars";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
      userRef.current.focus();
  }, []);

  useEffect(() => {
      setErrMsg('');
  }, [user, pwd]);

  // ------------ASHLEY-------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg('');

    try {
        const response = await axios.post('https://post-backend-2f54f7162fc4.herokuapp.com/guest/login', {
            username: user,
            password: pwd,
        });

        if (response.data.message === 'Login successful') {
            const { ID, role } = response.data.user; 

            //Storing id and role locally so it can be used for querying later
            localStorage.setItem('userID', ID);
            localStorage.setItem('userRole', role);

            if(role === 'admin') {
                navigate('/admin-home');
            }else if(role === 'employee'){
                navigate('/employee-home');
            }else if(role === 'customer'){
                navigate('/customer-home');
            }else if(role === 'manager'){
                navigate('/manager-home');
            }else if (role === 'business'){
                navigate('/business-home');
            }
            setSuccess(true);
        }
    } catch (error) {
        console.error('Login error:', error); 
        if (error.response) {
            console.error('Response data:', error.response.data); 
            setErrMsg(error.response.data.message);
        } else if (error.request) {
            console.error('Request data:', error.request); 
            setErrMsg('No response received from server');
        } else {
            console.error('Error setting up the request:', error.message);
            setErrMsg('Error setting up the request');
        }
    }
  };
  // ------------ASHLEY (END)-------------------------------------------------

  return (
    <div className="container">
        <GuestNavbar />
      {success ? (
          <section className="login-container">
              <h1>You are logged in!</h1>
              <br />
              <p>
                <Link to="/register">Register (Testing)</Link>
              </p>
          </section>
      ) : (
      <section className="login-container">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className="login-form">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                className="login-input"
            />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                className="login-input"
            />
            <button className="login-button">Sign In</button>
          </form>
          <p className="line">
              Need an Account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </section>
    )}
  </div>
  );
};

export default Login;