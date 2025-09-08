import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

interface QrCodeScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError: (errorMessage: string) => void;
}

const QrCodeScanner = ({ onScanSuccess, onScanError }: QrCodeScannerProps) => {
  const qrCodeRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    // Si el escáner ya existe, no creamos uno nuevo
    if (qrCodeRef.current) return;

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      // Opcional, para que el usuario pueda seleccionar una cámara
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    };

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader-div",
      config,
      false // true: verbose logging
    );

    const onScanSuccessLocal = (decodedText: string) => {
      // Detiene el escáner para evitar múltiples detecciones
      html5QrcodeScanner.pause(true);
      if (onScanSuccess) onScanSuccess(decodedText);
    };

    const onScanErrorLocal = (errorMessage: string) => {
      if (onScanError) onScanError(errorMessage);
    };

    html5QrcodeScanner.render(onScanSuccessLocal, onScanErrorLocal);
    qrCodeRef.current = html5QrcodeScanner;

    // Limpia el escáner al desmontar el componente
    return () => {
      if (qrCodeRef.current) {
        qrCodeRef.current.clear().catch(error => console.error("Error al limpiar el escáner:", error));
        qrCodeRef.current = null;
      }
    };
  }, [onScanSuccess, onScanError]);

  return (
    <div id="qr-reader-div" />
  )
};

export default QrCodeScanner;