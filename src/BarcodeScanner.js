import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import './barcode.css'; // Ensure you import the CSS file

const BarcodeScanner = () => {
  const [barcodeData, setBarcodeData] = useState("No barcode scanned yet");
  const [cameraActive, setCameraActive] = useState(false);
  const [manualId, setManualId] = useState("");
  const [productName, setProductName] = useState("");
  const webcamRef = useRef(null);
  const canvasRef = useRef(document.createElement('canvas'));

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const image = new Image();
        image.src = imageSrc;

        image.onload = () => {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

          try {
            const code = jsQR(imageData.data, canvas.width, canvas.height, {
              inversionAttempts: "dontInvert",
            });
            
            if (code) {
              setBarcodeData(code.data);
              console.log("Scanned Barcode Data:", code.data);
            }
          } catch (error) {
            console.error("Error decoding barcode:", error);
          }
        };
      }
    }
  };

  useEffect(() => {
    let interval;
    if (cameraActive) {
      interval = setInterval(capture, 1000);
    }
    return () => clearInterval(interval);
  }, [cameraActive]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!manualId || !barcodeData || !productName) {
      alert("Please enter all fields before submitting.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: manualId, barcode: barcodeData, productName }),
      });

      if (response.ok) {
        alert('Data saved successfully!');
        setManualId('');
        setProductName('');
        setBarcodeData('No barcode scanned yet');
      } else {
        const errorText = await response.text();
        alert('Failed to save data: ' + errorText);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('An error occurred while saving data.');
    }
  };

  return (
    <div className="barcode-scanner">
      <h1 className="scanner-heading">QR Code Scanner</h1>
      {!cameraActive ? (
        <button className="toggle-button" onClick={() => setCameraActive(true)}>Add the Product</button>
      ) : (
        <button className="toggle-button" onClick={() => setCameraActive(false)}>Stop</button>
      )}
      {cameraActive && (
        <div className="webcam-container">
          <p>Scan a QR Code and the data will be displayed below:</p>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            height="500px"
          />
        </div>
      )}
      <h2 className="barcode-data-heading">Scanned QR Code Data:</h2>
      <p className="barcode-data">{barcodeData}</p>
      <form onSubmit={handleSubmit} className="scanner-form">
        <label>
          Enter ID:
          <input
            type="text"
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            required
            className="input-field"
          />
        </label>
        <br />
        <label>
          Enter Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="input-field"
          />
        </label>
        <br />
        <button type="submit" className="submit-button">Save to Database</button>
      </form>
    </div>
  );
};

export default BarcodeScanner;
