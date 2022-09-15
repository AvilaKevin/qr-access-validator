import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../Context/AppContext';
import QrScanner from '../Components/QrScanner';
import db from '../Firebase/firebaseConfig';

function Admin() {

    //Context Call
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
    async function hasAccess() {
        // String to object
        // Get IDQr
        var temp = dataReaderQr.split(","),
            qrObj = {};
        for (let i = 0; i < temp.length; i += 2) {
            qrObj[temp[i]] = temp[(i + 1)];
        };

        var accessOffice = qrObj.accessOffice;

        const pruebId = "asdsadasd";

        //Validate Access
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

    return (
        <div className='h-screen w-full flex flex-col'>

            <header className='w-full p-3 bg-gray-50 rounded border-gray-200'>
                <figure>

                    <img className='w-10' src='https://www.freepnglogos.com/uploads/key-png/download-key-png-pic-png-image-pngimg-36.png' alt='Logo' />

                </figure>
            </header>

            <main className='flex flex-col items-center my-auto'>
                <div className='sm:rounded-lg'>
                    <table className='bg-gray-50 rounded border-gray-200'>
                        <thead className='uppercase bg-slate-300'>
                            <tr>
                                <th className="py-3 px-6">ID</th>
                                <th className="py-3 px-6">Office</th>
                                <th className="py-3 px-6">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                offices.map((office) => (
                                    <tr
                                        className='border-b'
                                        key={office.id}>
                                        <td className='py-2 px-2'>{office.id}</td>
                                        <td className='py-2 px-2 text-center'>{office.office}</td>
                                        <td className='py-2 px-2 text-center'>{office.description}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>


                <QrScanner />

                <button
                    className='mt-12 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
                    onClick={hasAccess}>validate access</button>
            </main>

            <footer
                className='fixed bottom-0 left-0 z-20 p-4 w-full bg-gray-50 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6'>
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 Avila Kevin™. All Rights Reserved.
                </span>
            </footer>
        </div>
    )
}

export default Admin