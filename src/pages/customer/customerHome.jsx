// ------------ASHLEY (Repurposed from Alejandro's Guest Home)-------------------------------------------------
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomerNavbar } from "../../components/Navbars";
import '../../styles/home.css';

const Home = () => {
  const userID = localStorage.getItem('userID');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    
    const getInfo = async () => {
        if (!userID || userRole != 'customer') {
            alert('User not logged in');
            navigate('/');
          }
    };

    getInfo();
  }, []); 

    return (
        <div className="container">
          <CustomerNavbar />

          <div className="home-content">
            <div className="content-wrapper">
              <h1>Welcome, Customer!</h1>
              <h3>UID: {userID} </h3>
              <p>Track packages on the move, view your package history, edit your profile or order some supplies!</p>
              

              <div className="services-section">
                <h2>Post Office Locations</h2>
                <ul>
                  <li>5001 N Mesa St, El Paso, TX, 79912</li>
                  <li>2001 Main St, Dallas, TX, 75201</li>
                  <li>1302 Texas Ave, Houston, TX, 77002</li>
                  <li>401 N Water St, Corpus Christi, TX, 78401</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
    )
}

export default Home;
// ------------ASHLEY (END)-------------------------------------------------