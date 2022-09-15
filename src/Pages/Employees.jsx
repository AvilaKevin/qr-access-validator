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
    const idUser = "idUser," + user.idObject;
    const accessOffice = "accessOffice," + user.userNameQResult.accessOffice;

    function prueba3() {
        console.log("SOY PRUEBA" + typeof accessOffice)
    }

    return (

        <div>
            <h1>Hola {userName}</h1>
            <div>
                <QRCode value={
                    idUser + "," + datosQr + "," + accessOffice
                } />
            </div>
            {/* <button onClick={userLocation}>Get Qr Access</button> */}
            <button onClick={prueba3}>prueba 2</button>
        </div>

    )
}

export default Employees


