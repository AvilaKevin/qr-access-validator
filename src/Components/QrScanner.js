import React from 'react';
import { QrReader } from 'react-qr-reader';
import { useAppContext } from '../Context/AppContext';

function QrScanner(props) {

    const {
        dataReaderQr,
        setDataReaderQr
    } = useAppContext();

    // if (!!error) {
    //     console.info(error);
    // }
    return (
        <>
            <div className='w-72'>
                <QrReader
                    onResult={(result, error) => {
                        if (!!result) {
                            setDataReaderQr(result?.text);
                        }


                    }}
                />
            </div>
            <p>{dataReaderQr}</p>
        </>
    );
}

export default QrScanner