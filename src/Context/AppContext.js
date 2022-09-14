import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export default function Store({ children }) {
    // User state
    const [user, setUser] = useState([])
    // Longitude and latitude Qr
    const [datosQr, setDatosQr] = useState([])

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
                    latitude = 'Latitude: ' + crd.latitude;
                    longitude = 'Longitude: ' + crd.longitude;
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

    var pruebita = console.log(user)

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                pruebita,
                userLocation,
                datosQr
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export function useAppContext() {
    return useContext(AppContext);
}
