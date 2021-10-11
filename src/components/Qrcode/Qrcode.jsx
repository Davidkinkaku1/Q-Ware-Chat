import * as React from 'react'; 
import QRcode from 'qrcode.react';




export default function Qrcode (props){

    return (
  
        <div className="qr-code-container">
            <QRcode
        id="qrCodeId"
        size={328}
        value={props.url}
        bgColor="white"
        fqcolor="black"
        />
        </div>

     
    )
}
