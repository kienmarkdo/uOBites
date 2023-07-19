import { useEffect, useState } from 'react';
import { CheckCircleFill, DashCircleFill, ArrowRight, InfoSquare } from "react-bootstrap-icons";
import "../../OrderStatus.scss";
import { Alert } from 'react-bootstrap';

export default function OrderStatus2() {
    
    // resizes the icons depending on the screen/window size
    const [iconSize, setIconSize] = useState(100);
    useEffect(() => {
        const calculateIconSize = () => {
            if (window.innerWidth > 768) {
                setIconSize(100);
            } else {
                setIconSize(70)
            }

        }
        window.addEventListener('resize', calculateIconSize)
    });

    return (
        <>
            <section className="statusContainer">
                <div className="progressBar">
                    <div className="iconGroup">
                        <CheckCircleFill size={iconSize} className='iconStyle' style={{color: "#90ee90"}}/>
                        <p>Order Received</p>
                    </div>
                    <ArrowRight size={75} className='arrowStyle'  />
                    <div className="iconGroup">
                        <CheckCircleFill size={iconSize} className='iconStyle' style={{color: "#90ee90"}}/>
                        <p>Order in progress</p>
                    </div>
                    <ArrowRight size={iconSize} className='arrowStyle' />
                    <div className="iconGroup">
                        <DashCircleFill size={iconSize} className='iconStyle incomplete'/>
                        <p>Order Completed</p>
                    </div>
                </div>
            </section>
            <Alert style={{marginTop: "5vh"}} variant='info'>
                <Alert.Heading>Note <InfoSquare size={20} style={{marginBottom: '3px'}}/></Alert.Heading>
                <p>Please patiently wait for your order to be completed.
                    If you leave this page, your order <strong>will be cancelled</strong> and you will be refunded. 
                </p>
                <p>Do not refresh this page as your order will be resubmitted</p>
            </Alert>
        </>
    )
}
