import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import supabase from "../../../components/database/supabase";

export default function QRpuntos(){
    const [mensaje, setMensaje] = useState("");
    const [name, setName] = useState("");
    const [verificado, setVerificado] = useState(null);
    const [puntaje, setPuntaje] = useState(null);
    const [editable, setEditable] = useState(false); // Estado para habilitar la edición
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
                    //console.warn("QR no detectado: ", error);
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
        setPuntaje(null);
        setName(null);
        const { data:estudianteData, error:estudianteError } = await supabase
            .from("Estudiantes")
            .select("*")
            .eq("identificador", identificador);
        if(estudianteError){
            console.error(estudianteError);
            setMensaje("Error al consultar supabase");
            setVerificado(false);
        } else if(estudianteData.length > 0){
            setVerificado(true);
            setMensaje(`✅ Usuario verificado: ${estudianteData[0].nombre}`);
            setName(estudianteData[0].nombre);
            obtenerPuntaje(identificador);
        }else {
            setVerificado(false);
            setMensaje("❌ Usuario no encontrado");
        }
    };

    const obtenerPuntaje = async (identificador) => {
        setMensaje("Obteniendo puntaje...");
        const {data:puntajeData, error:puntajeError} = await supabase
            .from("Puntaje")
            .select("*")
            .eq("id", identificador);

        if(puntajeError){
            console.error(puntajeError);
            setMensaje("Error ala consultar puntaje");
        }else if(puntajeData.length > 0){
            setPuntaje({...puntajeData[0], identificador});
            setMensaje("✅ Puntaje obtenido correctamente");
        }else{
            setMensaje("❌ No se encontraron datos de puntaje para este estudiante");
        }
    };

    const guardarPuntaje = async () => {
        setMensaje("Guardando cambios...");
        const { error } = await supabase
            .from("Puntaje")
            .update({
                companerismo: puntaje.companerismo,
                espiritu: puntaje.espiritu,
                fisico: puntaje.fisico,
            })
            .eq("id", puntaje.identificador);

        if (error) {
            console.error(error);
            setMensaje("❌ Error al guardar los cambios");
        } else {
            setMensaje("✅ Cambios guardados correctamente");
            setEditable(false); // Deshabilita la edición después de guardar
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPuntaje((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const reiniciarEscaneo = () => {
        setMensaje("");
        setName("");
        setVerificado(null);
        setPuntaje(null);
        setEditable(false);
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
        <div className="qr-puntos-container">
            <h1>Escáner QR para Puntaje estudiantil</h1>
            <div id="qr-reader" ref={scannerRef} className="qr-reader"></div>
            <p className="mensaje">{mensaje}</p>
            {verificado !== null && (
                <p className={`estado ${verificado ? "verificado" : "no-verificado"}`}>
                    {verificado ? `Usuario verificado ${name}` : "Usuario no encontrado"}
                </p>
            )}
            {puntaje && (
                <div className="puntaje-info">
                    <h2>Puntaje del estudiante:</h2>
                    <div>
                        <label>
                            <strong>Compañerismo:</strong>
                            {editable ? (
                                <input
                                    type="number"
                                    name="companerismo"
                                    value={puntaje.companerismo}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                puntaje.companerismo
                            )}
                        </label>
                    </div>
                    <div>
                        <label>
                            <strong>Espíritu:</strong>
                            {editable ? (
                                <input
                                    type="number"
                                    name="espiritu"
                                    value={puntaje.espiritu}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                puntaje.espiritu
                            )}
                        </label>
                    </div>
                    <div>
                        <label>
                            <strong>Físico:</strong>
                            {editable ? (
                                <input
                                    type="number"
                                    name="fisico"
                                    value={puntaje.fisico}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                puntaje.fisico
                            )}
                        </label>
                    </div>
                    {editable ? (
                        <button onClick={guardarPuntaje}>Guardar Cambios</button>
                    ) : (
                        <button onClick={() => setEditable(true)}>Editar Puntaje</button>
                    )}
                    <button onClick={reiniciarEscaneo} style={{ marginTop: "10px" }}>
                        Registrar otro puntaje
                    </button>
                </div>
            )}
        </div>
    );
}