import React from 'react'
import db from '../Firebase/firebaseConfig';

const Admin = () => {

    function CreateUser() {
        db.collection("Users").add({
            userName: document.getElementById('userName').value,
            password: document.getElementById('password').value,
            userName: document.getElementById('valAdmin').value
        })
            .then((docRef) => {
                console.log("registro existoso");
            })
            .catch((error) => {
                console.error("Error ", error);
            });
    }

    function CreateSede() {
        db.collection("Offices").add({
            Usuario_name: document.getElementById('name').value,
            cargo: document.getElementById('cargo').value
        })
            .then((docRef) => {
                console.log("registro existoso");
            })
            .catch((error) => {
                console.error("Error ", error);
            });
    }

    return (
        <div>
            <form>
                <h2>User Register</h2>
                <input type='text' placeholder='User name' id='userName' />
                <input type='text' placeholder='Password' id='password' />
                <input type='text' placeholder='Acces office' id='accesOffice' />
                <input type='checkbox' placeholder='Validate admin' id='valAdmin' />
                <button type='submit' onChange={CreateUser}>Create</button>
            </form>

            <form>
                <h2>Sede Register</h2>
                <input type='text' placeholder='Sede Name' id='office' />
                <input type='text' placeholder='Description' id='description' />
                <button type='submit' onChange={CreateSede}>Create</button>
            </form>
        </div>
    )
}

export default Admin