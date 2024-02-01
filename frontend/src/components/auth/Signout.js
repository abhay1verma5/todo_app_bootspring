import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function Signout({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('name');
    setIsAuthenticated(false);
    navigate("/");
  }, [navigate, setIsAuthenticated]);

  return (
    <div className="text-center">
      <h1>Successfully sign out</h1>
    </div>
  );
}

export default Signout;
