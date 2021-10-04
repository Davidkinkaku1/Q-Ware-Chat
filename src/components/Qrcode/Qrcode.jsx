import * as React from 'react'; 
import QRcode from 'qrcode.react';
import { useState } from "react";



export default function Qrcode (){
    // using the useState to pass on the value to the Qrcode
    const [url, setUrl] = useState('')
    // calling the store where all the links are stored



    const downloadQrcode = (event) =>{
        
        event.preventDefault();

        setUrl(url);

    }

    const QRcodes = (
        <QRcode
        id="qrCodeId"
        size={180}
        value={url}
        bgColor="white"
        fqColor="black"
        />
    );
    return (
        <>
        <div className="qr-code-container">
            <form onSubmit={downloadQrcode} className="qr-form">
            <input
            type="text"
            value={url}
            onChange={(evt)=> setUrl(evt.target.value)}
            placeholder= "Copy your URL"
            />
            <button type="submit" className="qr-button">Make a QR code</button>
            </form>
            <br/>
            <div className="qr-code-container-code">{QRcodes}</div>
        </div>

        </>
    )
}
