import { useEffect, useState } from "react";
import { PersonCircle, BoxArrowRight } from "react-bootstrap-icons";
import appLogo from "../../images/app_logo_white.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    const viewProfile = () => {
      navigate("/editProfile", {state:{email}});
    };

    const logout = () => {
        navigate('/');
    }

    const navigateToLogin = () => {
        navigate('/')
    }

    const navigateToHome = () => {
        navigate('/home', { state: {email} });
    }

    const location = useLocation();
    const { email } = location.state || {};
    const [name, setName] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    const fetchUserInfo = async () => {
        try {
        const response = await axios.get("/get_user_info", {
            params: {
            email: email,
            },
        });
        setName(response.data["first_name"]);
        } catch (error) {
        console.error("Error:", error);
        }
    };

    fetchUserInfo();
    }, [email]);

    // check whether the user is logged in or not in order to display the correct content
    useEffect(() => {
        if (email) {
            setIsLoggedIn(true);
        }
    }, [email]);

    return (
        <>
            {isLoggedIn ? (
            <>
                <div className="landing-header">
                    <div className="d-flex align-items-center">
                    <img src={appLogo} alt="uOBites" width={"5%"} title="Home" 
                    onClick={navigateToHome} style={{cursor: "pointer"}}
                    />
                    <h4 className="ms-2 mt-2">uOBites - Hi {name}!</h4>
                    </div>
                    <div>
                    <PersonCircle
                        size={25}
                        className="landing-page-icon me-4"
                        title="View Profile"
                        onClick={viewProfile}
                    />
                    <BoxArrowRight
                        size={25}
                        className="landing-page-icon me-4"
                        title="Logout"
                        onClick={logout}
                    />
                    </div>
                </div>
            </>
            ) : (
                    <>
                        <div className="landing-header">
                            <div className="d-flex align-items-center">
                                <img src={appLogo} alt="uOBites" width={"5%"} title="Login"
                                    onClick={navigateToLogin} style={{ cursor: "pointer" }} />
                                <h4 className="ms-2 mt-2">uOBites</h4>
                            </div>
                        </div>
                </>
            )}
        </>
    );
}
