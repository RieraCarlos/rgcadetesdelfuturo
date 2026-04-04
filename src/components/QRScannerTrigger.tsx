import React from "react";
import { Link } from "react-router-dom";
import { QrCode, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const QRScannerTrigger = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="relative overflow-hidden bg-[#202312] rounded-[2.5rem] border-4 border-[#3b4125] shadow-[12px_12px_0px_0px_rgba(59,65,37,0.3)] p-8 md:p-12 group">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b4125] opacity-10 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#3b4125] opacity-5 rounded-full -ml-10 -mb-10" />
                
                <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Icon Section */}
                    <div className="flex-shrink-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-[#3b4125] rounded-3xl flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-all duration-500 shadow-xl border-2 border-[#ffcc01]/20">
                            <QrCode className="w-12 h-12 md:w-16 md:h-16 text-[#ffcc01]" />
                        </div>
                    </div>
                    
                    {/* Text Section */}
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div className="flex items-center justify-center md:justify-start gap-2 text-[#ffcc01] text-xs font-black uppercase tracking-widest italic">
                            <ShieldCheck className="w-4 h-4" />
                            Acceso Seguro para Representantes
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                            Consulta la Ficha <br className="hidden md:block" /> de tu <span className="text-[#ffcc01]">Cadete</span>
                        </h2>
                        <p className="text-zinc-400 font-medium max-w-md text-sm md:text-base">
                            Escanea el código QR de tu hijo o supervisado para visualizar su rendimiento académico, asistencia y méritos en tiempo real.
                        </p>
                    </div>
                    
                    {/* Button Section */}
                    <div className="flex-shrink-0 w-full md:w-auto">
                        <Link to="/scanner">
                            <Button className="w-full md:w-auto h-16 px-8 bg-[#ffcc01] hover:bg-[#e6b800] text-black font-black text-lg uppercase italic border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] active:translate-y-[0px] transition-all flex items-center gap-3">
                                Iniciar Escaneo
                                <ArrowRight className="w-6 h-6" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRScannerTrigger;
