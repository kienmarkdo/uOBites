import React, { useEffect, useState } from 'react';
import '../styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ViewOutlets from './ViewOutletsPage';
import MenuPage from './MenuPage';
import EditProfile from './EditProfile';

// idk if there's a better way to do it, cause the import statements gets long as we continue adding all the stores
// and u cannot add the path to an image directly in the code below

const LandingPage = () => {

  const location = useLocation();
  const {email} = location.state || {};

  
  
  return (
    <>
      <Navbar />
      
      <div className='landing-body'>

          <Routes>
              <Route path="/" element={<ViewOutlets />} />
              <Route path="/outlet_menu" element={<MenuPage />} />
              <Route path="/edit_profile" element={<EditProfile />} />
          </Routes>

      </div>
    </>
  );
}

export default LandingPage;
