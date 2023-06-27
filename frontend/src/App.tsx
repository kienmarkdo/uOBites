import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./screens/LandingPage"
import RegistrationPage from './screens/RegistrationPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
