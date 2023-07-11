import React from "react";

interface StoreIconProps {
    storeName: string;
    imageSrc: string;
}

const StoreIcon: React.FC<StoreIconProps> = ({storeName, imageSrc}) => {
    return (
        <div className="store-icon-container">
            <img src={imageSrc} alt={storeName} className="store-icon-img"/>
            <h6>{storeName}</h6>
        </div>
    )
}

export default StoreIcon