import React, { useEffect } from 'react'
import QRCode from "react-qr-code";
import { useAppContext } from '../Context/AppContext';


function Employees() {


    // Context Call 
    const {
        user,
        userLocation,
        datosQr
    } = useAppContext();


    // Qr values:

    // Get user location
    useEffect(() => {
        userLocation();
    }, []);

    const userName = user.userNameQResult.userName;
    const userId = user.idObject;


    function prueba3() {
        console.log(datosQr)
    }

    return (

        <div>
            <h1>Hola {userName}</h1>
            <div>
                <QRCode value={
                    "Id user: " + userId + ", " +
                    "Geolocation user: " + datosQr
                } />
            </div>
            {/* <button onClick={userLocation}>Get Qr Access</button> */}
            <button onClick={prueba3}>prueba 2</button>
        </div>

    )
}

export default Employees


