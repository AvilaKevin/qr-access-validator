import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../Context/AppContext';
import QrScanner from '../Components/QrScanner';
import db from '../Firebase/firebaseConfig';

function Admin() {
    const {
        dataReaderQr,
    } = useAppContext();
    // Offices State
    const [offices, setOffices] = useState([])

    // Get Offices
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


    // Validate Acces
    async function haveAccess() {
        // String to object
        // Get IDQr
        var temp = dataReaderQr.split(","),
            qrObj = {};
        for (let i = 0; i < temp.length; i += 2) {
            qrObj[temp[i]] = temp[(i + 1)];
        };

        var accessOffice = qrObj.accessOffice;

        // // Array ID offices
        // let saveIdOffices = []
        // offices.map((office) =>
        //     saveIdOffices.push(office.id)
        // )
        // // console.log(saveIdOffices[0]);
        const pruebId = "asdsadasd";

        const docRef = doc(db, "Offices", accessOffice);
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                alert("User has access to :" + docSnap.data());
            } else {
                alert("User without access data")
            }

        } catch (error) {
            console.log(error)
        }
    }

    // Show Offices Data
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

            <div>
                <QrScanner />
            </div>

            <button onClick={haveAccess}>prueba</button>
        </div>
    )
}

export default Admin