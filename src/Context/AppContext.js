import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export default function Store({ children }) {
    // User state
    const [user, setUser] = useState([])
    // Longitude and latitude Qr
    const [datosQr, setDatosQr] = useState([])
    // Qr Data
    const [dataReaderQr, setDataReaderQr] = useState();

    // Get Userlocation
    function userLocation() {
        const promesa = new Promise(
            (resolve, reject) => {


                const options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };

                let latitude;
                let longitude;
                function success(pos) {
                    const crd = pos.coords;
                    latitude = 'latitude,' + crd.latitude;
                    longitude = 'longitude,' + crd.longitude;
                    resolve(setDatosQr([latitude, longitude]));
                }

                function error(err) {
                    reject(alert(`Please active the geolocation, to get acces`));
                }

                navigator.geolocation.getCurrentPosition(success, error, options);
            }
        )

        return promesa;
    }

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                userLocation,
                datosQr,
                dataReaderQr,
                setDataReaderQr
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export function useAppContext() {
    return useContext(AppContext);
}
