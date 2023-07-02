import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./screens/LandingPage"
import RegistrationPage from './screens/RegistrationPage';
import LoginPage from './screens/LoginPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
