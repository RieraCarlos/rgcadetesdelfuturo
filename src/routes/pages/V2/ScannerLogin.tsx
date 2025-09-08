import QrCodeScanner from "@/components/QrScanner/QrCodeScanner.js";
import { loginEstudiante } from "@/services/loginEstudiante.js";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ScannerLogin(){
    const navigate = useNavigate();
    const [scannedData, setScannedData] = React.useState<string | null>(null);
    const [verificacionEstado, setVerificacionEstado] = React.useState<string>('');

    interface ScanResult {
        decodedText: string;
    }

    const handleScanSuccess = async (decodedText: string) => {
        setScannedData(decodedText);
        await verificarEstudiante(decodedText);
    }

    const verificarEstudiante = async (cedulaId: string) => {
        try {
            const response = await loginEstudiante(cedulaId);
            if (response) {
                setVerificacionEstado('Estudiante verificado con éxito.');
                navigate('/estudiante'); // Redirige al dashboard u otra página
            } else {
                setVerificacionEstado('Estudiante no encontrado.');
            }
            return response;
        } catch (error) {
            setVerificacionEstado('Error al verificar el estudiante.');
            return null;
        }
    }
    return(
        <div className="bg-[#030403] h-screen flex flex-col items-center justify-center text-white">
            <h1>Escáner de Código QR</h1>
            <QrCodeScanner 
                onScanSuccess={handleScanSuccess}
                onScanError={(error) => console.error("QR Scan Error:", error)}
            />
            {scannedData && <p>Datos escaneados: {scannedData}</p>}
            {verificacionEstado && <p>{verificacionEstado}</p>}
        </div>
    )
}