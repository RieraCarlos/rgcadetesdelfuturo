import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Camera, X, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const QRScannerView = () => {
    const navigate = useNavigate();
    const [scannerLoaded, setScannerLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            { 
                fps: 10, 
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0
            },
            /* verbose= */ false
        );

        const onScanSuccess = (decodedText: string) => {
            const rawValue = decodedText.trim();
            if (rawValue) {
                scanner.clear();
                toast.success("Código detectado. Cargando ficha...");
                if ("vibrate" in navigator) navigator.vibrate(200);
                navigate(`/record/${rawValue}`);
            }
        };

        const onScanFailure = (error: string) => {
            // Silence common failures to avoid console spam
            // console.warn(`Scan failure: ${error}`);
        };

        scanner.render(onScanSuccess, onScanFailure);
        setScannerLoaded(true);

        return () => {
            scanner.clear().catch(err => console.error("Could not stop scanner", err));
        };
    }, [navigate]);

    return (
        <div className="min-h-screen bg-[#202312] text-white flex flex-col items-center justify-center p-4">
            {/* Header */}
            <div className="w-full max-w-md flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="text-[#ffcc01]" />
                    <span className="font-black uppercase italic tracking-tighter text-xl">SISTEMA DE CAPTURA</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-full hover:bg-white/10">
                    <X />
                </Button>
            </div>

            <div className="w-full max-w-sm aspect-square relative bg-black/40 rounded-3xl border-4 border-[#3b4125] overflow-hidden shadow-2xl">
                {!scannerLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-[#ffcc01]" />
                        <p className="text-xs font-bold uppercase opacity-50">Inicializando Cámara...</p>
                    </div>
                )}
                
                {/* QR Scanner Container */}
                <div id="reader" className="w-full h-full"></div>

                {/* Guide Frame Overlay */}
                <div className="absolute inset-0 pointer-events-none ring-[100px] ring-black/60">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] border-4 border-[#ffcc01] rounded-3xl opacity-50 scale-100 animate-pulse" />
                </div>
            </div>

            {/* Instructions */}
            <div className="mt-8 text-center max-w-xs space-y-4">
                <div className="flex items-center justify-center gap-2 text-[#ffcc01]">
                    <Camera className="w-5 h-5" />
                    <span className="font-black uppercase text-sm">Apunta al código QR</span>
                </div>
                <p className="text-zinc-400 text-xs font-medium uppercase tracking-widest leading-relaxed">
                    Coloca el código QR del cadete dentro del recuadro para visualizar su historial militar oficial.
                </p>
                
                {error && (
                    <div className="p-4 bg-red-500/20 border border-red-500 rounded-xl flex items-center gap-3 text-red-500 text-xs text-left">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}
            </div>

            {/* Branding */}
            <div className="mt-12 opacity-30 flex items-center gap-4">
                <div className="h-px w-8 bg-white" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">RG CADETES DEL FUTURO</span>
                <div className="h-px w-8 bg-white" />
            </div>
            
            <style>{`
                #reader__scan_region video {
                    width: 100% !important;
                    height: 100% !important;
                    object-fit: cover !important;
                }
                #reader__dashboard {
                    background: transparent !important;
                    border: none !important;
                    color: white !important;
                    padding: 10px !important;
                }
                #reader__dashboard_section_csr button {
                    background: #ffcc01 !important;
                    color: black !important;
                    border-radius: 8px !important;
                    padding: 8px 16px !important;
                    font-weight: 900 !important;
                    text-transform: uppercase !important;
                    font-style: italic !important;
                    border: 2px solid black !important;
                    margin: 4px !important;
                }
                #reader__status_span {
                    display: none !important;
                }
            `}</style>
        </div>
    );
};

export default QRScannerView;
