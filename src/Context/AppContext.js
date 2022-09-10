import React from "react";

const AppContext = React.createContext();

export default function Store({ children }) {
    const [user, setUser] = React.useState()

    var pruebita = console.log(user)

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                pruebita,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export function useAppContext() {
    return React.useContext(AppContext);
}
