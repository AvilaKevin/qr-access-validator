import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader';
import db from '../Firebase/firebaseConfig';

// Render:
// - Table
// - QrReader

function Admin() {

    // Qr Data
    const [dataReaderQr, setDataReaderQr] = useState('No data');

    // Offices State
    const [offices, setOffices] = useState([])

    useEffect(() => {
        // Get Offices
        const officesCollection = collection(db, "Offices")

        const getSedes = async () => {
            const data = await getDocs(officesCollection)
            setOffices(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
        }
        getSedes();

        // String to object
        if (dataReaderQr == "No data") {
        } else {
            // Get IDQr
            let temp = dataReaderQr.split(","),
                qrObj = {};
            for (let i = 0; i < temp.length; i += 2) {
                qrObj[temp[i]] = temp[(i + 1)];
            };
            let accessOffice;
            accessOffice = qrObj.accessOffice;
            hasAccess(accessOffice)
        }
    }, [dataReaderQr]);

    // Validate Access
    async function hasAccess(accessOffice) {
        const docRef = doc(db, "Offices", accessOffice);
        try {
            const docSnap = await getDoc(docRef);
            let QResult = docSnap.data()
            if (docSnap.exists()) {
                alert("User has access to " + QResult.office);
            } else {
                alert("User without access data")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-screen w-full flex flex-col'>
            <header className='w-full p-3 bg-gray-50 border-b shadow border-gray-200'>
                <figure>

                    <img className='w-10' src='https://www.freepnglogos.com/uploads/key-png/download-key-png-pic-png-image-pngimg-36.png' alt='Logo' />

                </figure>
            </header>

            <main className='w-full h-full flex items-center justify-center'>

                <div className='w-full sm:w-[60%] flex flex-col items-center'>

                    <div className='w-[95%] sm:w-auto overflow-x-auto flex justify-center'>

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

                    <div>
                        <div className='w-72'>
                            <QrReader
                                onResult={(result) => {
                                    if (!!result) {
                                        setDataReaderQr(result?.text);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>

            </main>

            <footer
                className='mt-auto p-4 w-full text-center bg-gray-50 border-t border-gray-200 shadow'>
                <span className="text-sm text-gray-500 ">© 2022 Avila Kevin™. All Rights Reserved.
                </span>
            </footer>
        </div>
    )
}

export default Admin