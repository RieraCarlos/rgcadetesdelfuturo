import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import supabase from "../../../components/database/supabase";

export default function QRasistencia(){
    const [mensaje, setMensaje] = useState("");
    const [verificado, setVerificado] = useState(null);
    const scannerRef = useRef(null);

    useEffect(() => {
        if(scannerRef.current){
            const scanner = new Html5QrcodeScanner(
                scannerRef.current.id,
                { fps: 10, qrbox: 250 },
                false   
            );
            scanner.render(
                async (decodedText) => {
                    scanner.clear();
                    verificarUsuario(decodedText);
                },
                (error) => {
                    console.warn("QR no detectado: ", error);
                }
            );
            return () => {
                scanner.clear().catch((error) => {
                    console.error("Error al limpiar el escáner: ", error);
                });
            };
        }
    }, []);

    const verificarUsuario = async (identificador) => {
        setMensaje("Verificando...");
        const { data, error } = await supabase
            .from("Estudiantes")
            .select("*")
            .eq("identificador", identificador);
        if(error){
            console.error(error);
            setMensaje("Error al consultar supabase");
            setVerificado(false);
        } else if(data.length > 0){
            setVerificado(true);
            setMensaje(`✅ Usuario verificado: ${data[0].nombre}`);
            insertarAsistencia(identificador);
        }else {
            setVerificado(false);
            setMensaje("❌ Usuario no encontrado");
        }
    };

    const insertarAsistencia = async (identificador) => {
        const {data, error} = await supabase
            .from("Asistencia")
            .insert([
                { 
                    user:identificador,
                    fecha: new Date().toISOString(), // Fecha y hora actual 
                },
            ]);
        if(error){
            console.error("Error al insertar asistencia: ", error);
            setMensaje("Error al registrar asistencia");
        }else{
            console.log("Asistencia registrada: ", data);
            setMensaje(`✅Asistencia registrada correctamente ${data[0].nombre}`);
        }

    }

    const reiniciarEscaneo = () => {
        setMensaje("");
        setVerificado(null);
        if (scannerRef.current) {
            const scanner = new Html5QrcodeScanner(
                scannerRef.current.id,
                { fps: 10, qrbox: 250 },
                false
            );
            scanner.render(
                async (decodedText) => {
                    scanner.clear();
                    verificarUsuario(decodedText);
                },
                (error) => {
                    console.warn("QR no detectado: ", error);
                }
            );
        }
    };

    return (
        <div className="qr-asistencia-container">
            <div className="qr-asistencia-header">
                <h1>Escáner QR para Asistencia</h1>
                <p>Escanea el código QR para registrar tu asistencia.</p>
            </div>
            <div className="qr-reader-container">
                <div id="qr-reader" ref={scannerRef}></div>
            </div>
            <div className="qr-asistencia-mensaje">
                <p>{mensaje}</p>
                {verificado !== null && (
                    <p
                        className={`mensaje-estado ${
                            verificado ? "mensaje-verificado" : "mensaje-error"
                        }`}
                    >
                        {verificado
                            ? "Registrado la asistencia"
                            : "Usuario no encontrado"}
                    </p>
                )}
                {verificado && (
                    <button className="reiniciar-button" onClick={reiniciarEscaneo}>
                        Escanear otro aspirante
                    </button>
                )}
            </div>
        </div>
    )

}