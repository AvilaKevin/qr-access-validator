import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import db from '../Firebase/firebaseConfig';

function Admin() {

    const [offices, setOffices] = useState([])

    useEffect(() => {
        const officesCollection = collection(db, "Offices")

        const getSedes = async () => {
            const data = await getDocs(officesCollection)
            setOffices(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
            console.log(offices)
        }
        getSedes();
    }, []);

    function prueba() {
        console.log(offices);
    }

    const officesIdLi = offices.map((office) =>
        <li key={office.id}
        >{office.id}</li>
    );

    const officesLi = offices.map((office) =>
        <li key={office.id}
        >{office.office}</li>
    );

    const officesDescriptionLi = offices.map((office) =>
        <li key={office.id}
        >{office.description}</li>
    );


    return (
        <div>
            <table>
                <tr>
                    <th>ID Offices</th>
                    <th>Offices</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td>{officesIdLi}</td>
                    <td>{officesLi}</td>
                    <td>{officesDescriptionLi}</td>
                </tr>
            </table>

            <div>Scaner Qr</div>
        </div>
    )
}

export default Admin