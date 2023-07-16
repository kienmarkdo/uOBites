import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface StoreIconProps {
    outletId: number;
    outletName: string;
    imageSrc: string;
    email: string;
}

const StoreIcon: React.FC<StoreIconProps> = ({outletId, outletName, imageSrc, email}) => {
    const navigate = useNavigate();

    const handleOutletClick = () => {
        const info = {
            email: email,
            outletId: outletId,
            outletName: outletName,
        };
        navigate(`outletMenu/${outletId}`, {state: info})
    }

    return (
        // <Link to={`outletMenu/${outletId}`} style={{ color: '#FFFFFF', textDecoration: 'none'}} >
            <div className="store-icon-container" onClick={handleOutletClick}>
                <img id={outletId.toString()} src={imageSrc} alt={outletName} className="store-icon-img"/>
                <h6>{outletName}</h6>
            </div>
        // </Link>
    )
}

export default StoreIcon