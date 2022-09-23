import React, { useEffect } from 'react'
import QRCode from "react-qr-code";
import { useAppContext } from '../Context/AppContext';

// Render:
// - QR
// - User name
// Props:
// - useAppContext(user)
// - useAppContext(userLocation)
// - useAppContext(datosQr)

function Employees() {

    // Context Call 
    const {
        user,
        userLocation,
        datosQr
    } = useAppContext();

    // Get user location
    useEffect(() => {
        userLocation();
    }, []);

    // Qr values:
    const userName = user.userNameQResult.userName;
    const idUser = "idUser," + user.idObject;
    const accessOffice = "accessOffice," + user.userNameQResult.accessOffice;

    return (

        <div className='h-screen w-full flex flex-col items-center'>

            <header className='w-full p-3 bg-gray-50 border-b shadow border-gray-200'>
                <figure>

                    <img className='w-10' src='https://www.freepnglogos.com/uploads/key-png/download-key-png-pic-png-image-pngimg-36.png' alt='Logo' />

                </figure>
            </header>

            <div className='flex flex-col items-center'>
                <h1 className='font-semibold text-2xl my-8'>Hi! {userName}</h1>

                <p className='mb-8'>First all, you have to allow the location for get access</p>

                <div>
                    <QRCode value={
                        idUser + "," + datosQr + "," + accessOffice
                    } />
                </div>
            </div>

            <footer
                className='mt-auto p-4 w-full text-center bg-gray-50 border-t border-gray-200 shadow'>
                <span className="text-sm text-gray-500 ">© 2022 Avila Kevin™. All Rights Reserved.
                </span>
            </footer>
        </div>

    )
}

export default Employees


