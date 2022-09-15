import React from 'react';
import { useAppContext } from '../Context/AppContext.js';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
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
        let idObject;

        querySnapshotUserName.forEach((doc) => {
            idObject = doc.id;
            userNameQResult = doc.data();
        });
        querySnapshotPassword.forEach((doc) => {
            passwordQResult = doc.data();
        });

        let bdUser = userNameQResult.userName;
        let bdPassword = passwordQResult.password;
        let isAdmin = passwordQResult.valAdmin;

        const objectCompuest = { idObject, userNameQResult };

        // Users Validation:
        if (bdUser === inputUser && bdPassword === inputPassword) {
            await store.setUser(objectCompuest);
            if (isAdmin == true) {
                console.log("You are login like admin");
                navigate("/Admin");
            } else {
                console.log("You are login like employee");
                navigate("/Employees");
            };
        } else {
            console.log("User no found");
        };
    };

    return (
        <div className='h-screen w-full flex flex-col items-center'>

            <div className='my-auto w-96 p-4 border-none'>

                <div className='flex flex-col items-center mb-6'>
                    <figure className='flex justify-center mb-7'>

                        <img className='w-16' src='https://www.freepnglogos.com/uploads/key-png/download-key-png-pic-png-image-pngimg-36.png' alt='Logo' />

                    </figure>

                    <h1 className='font-semibold text-2xl'>Sign in</h1>
                </div>

                <div>
                    <form className='flex flex-col p-4'>

                        <input
                            className='block p-2 w-full text-gray-900 bg-gray-100 rounded-lg mb-6'
                            type='text' name='user' placeholder='User' value={inputUser} onChange={handleChange} />

                        <input
                            className='block p-2 w-full text-gray-900 bg-gray-100 rounded-lg'
                            type='Password' name='password' placeholder='Password' value={inputPassword} onChange={handleChange} />

                        <button
                            className='mt-12 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
                            onClick={usuarioValidator}>Sign in</button>
                    </form>
                </div>

            </div>

            <footer
                className='fixed bottom-0 left-0 z-20 p-4 w-full bg-gray-50 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6'>
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 Avila Kevin™. All Rights Reserved.
                </span>
            </footer>
        </div>
    );
};

export default Login