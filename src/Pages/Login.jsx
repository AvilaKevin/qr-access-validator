import React from 'react';
import { useAppContext } from '../Context/AppContext.js';
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import db from '../Firebase/firebaseConfig.js';

const Login = () => {

    const navigate = useNavigate();

    // Call AppContext
    const store = useAppContext();

    // States
    const [inputUser, setInputUser] = React.useState("");
    const [inputPassword, setInputPassword] = React.useState("");

    // Inputs Function
    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        switch (name) {
            case "user":
                setInputUser(value);
                break;
            case "password":
                setInputPassword(value);
                break;
            default:
        };
    };

    // LOGIN BUTTON
    async function usuarioValidator(e) {
        e.preventDefault();

        const queryUserName = query(collection(db, "Users"), where("userName", "==", inputUser));
        const queryPassword = query(collection(db, "Users"), where("password", "==", inputPassword));

        const querySnapshotUserName = await getDocs(queryUserName);
        const querySnapshotPassword = await getDocs(queryPassword);

        let userNameQResult = [];
        let passwordQResult = [];

        querySnapshotUserName.forEach((doc) => {
            userNameQResult = doc.data();
        });
        querySnapshotPassword.forEach((doc) => {
            passwordQResult = doc.data();
        });

        let bdUser = userNameQResult.userName;
        let bdPassword = passwordQResult.password;
        let isAdmin = passwordQResult.valAdmin;

        // users validation:
        if (bdUser === inputUser && bdPassword === inputPassword) {
            console.log("iniciaste sesion");
            await store.setUser(userNameQResult);
            if (isAdmin == true) {
                console.log("Iniciaste como administrador");
                navigate("/Admin");
                // return (<Link to={`/Admin`} />)
            } else {
                console.log("Iniciaste como usuario");
            };
        } else {
            console.log("Usuario no encontrado");
        };
    };

    return (
        <div className='flex justify-center'>

            <div className='bg-slate-500 h-96'>
                <div className='flex flex-col items-center'>

                    <figure>
                        <img src='https://cdn-icons-png.flaticon.com/128/731/731985.png' alt='Logo' />
                    </figure>

                    <h1>Sign in</h1>
                </div>

                <div>

                    <form className='flex flex-col p-4'>
                        <input type='text' name='user' placeholder='User' value={inputUser} onChange={handleChange} />
                        <input type='Password' name='password' placeholder='Password' value={inputPassword} onChange={handleChange} />
                        <button onClick={usuarioValidator}>Sign in</button>
                    </form>

                </div>

            </div>

        </div>
    );
};

export default Login