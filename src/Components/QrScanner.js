import React from 'react';
import { QrReader } from 'react-qr-reader';
import { useAppContext } from '../Context/AppContext';
import './QrScanner.css';

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
            <div className='ContainerQr'>
                <QrReader
                    onResult={(result, error) => {
                        if (!!result) {
                            setDataReaderQr(result?.text);
                        }


                    }}
                    style={{ width: '100%' }}
                />
            </div>
            <p>Aqui va el resultado {dataReaderQr}</p>
        </>
    );
}

export default QrScanner