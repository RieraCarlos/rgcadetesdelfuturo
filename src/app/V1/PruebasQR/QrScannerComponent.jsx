import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const QrScanner = ({ onScan }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText) => {
        onScan(decodedText);
        scanner.clear();
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );

    return () => {
      scanner.clear();
    };
  }, [onScan]);

  return <div id="qr-reader" style={{ width: "100%" }}></div>;
};

export default QrScanner;
