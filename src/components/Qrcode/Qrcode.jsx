import * as React from 'react'; 
import QRcode from 'qrcode.react';



export default function Qrcode (){
    // using the useState to pass on the value to the Qrcode
    const [url, setUrl] = useState(url)
    // calling the store where all the links are stored



    const downloadQrcode = (event) =>{
        
        event.preventDefault();

        setUrl(url);

    }

    const QRcode = (
        <Qrcode
        id="qrCodeId"
        size={300}
        value={url}
        bgColor="white"
        fqColor="black"
        />
    );
    return (
        <>
        <div className="qr-code-container">
            
        </div>

        </>
    )
}
