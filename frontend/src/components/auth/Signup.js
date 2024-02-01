import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Signup({ isAuthenticated, setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', {
        username,
        password,
      });
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('name', response.data.username);
      setIsAuthenticated(true);
    } catch (error) {
      setMessage('');
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error: something happened');
      }
      setIsAuthenticated(false);
      return;
    }

    setUsername('');
    setPassword('');
    setErrorMessage('');
    setMessage('Sign up successful');
    await timeout(1000);
    navigate("/");
  };

  useEffect(() => {
    setMessage('');
  }, [username, password]);

  const showMessage = () => {
    if (message === '') {
      return <div></div>;
    }
    return (
      <div className="alert alert-success" role="alert">
        {message}
      </div>
    );
  };

  const showErrorMessage = () => {
    if (errorMessage === '') {
      return <div></div>;
    }

    return (
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    );
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="form-control"
          ></input>
        </div>
        <button className="btn btn-primary">Sign Up</button>
      </form>
      {showMessage()}
      {showErrorMessage()}
    </div>
  );
}

export default Signup;
