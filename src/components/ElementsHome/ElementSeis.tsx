import Lanyard from "@/hooks/gsap/Lanyard";
import ElementProductos from "./ElementProductos";
export default function ElementoSeis(){
    return(
        <div className="text-white mb-15">
            <div className=" flex justify-center items-center mb-8 px-4">
                <h2 className="text-5xl md:text-6xl font-extrabold text-center">Inversión en el <span className="text-[#8d8159]">Futuro de su Hijo</span></h2>
            </div>
            <div className=" px-4 md:px-14  py-2 md:py-7 space-y-5">
                <p className="text-lg sm:text-xl md:text-2xl font-bold"><span className="bg-amber-50 rounded-full py-0.5 px-3 text-lg">.</span>  Curso de un año, dividido en 3 niveles de 4 meses cada uno.</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold"><span className="bg-amber-50 rounded-full py-0.5 px-3 text-lg">.</span>  Inversión Total: $60 (Compuesto por $35 de matrícula y $25 de pensión)</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold"><span className="bg-amber-50 rounded-full py-0.5 px-3 text-lg">.</span>  Certificado digital e Ingreso a plataforma mediante carnet.</p>
            </div>
            {/*Carnet*/}
            <Lanyard />
            <ElementProductos/>
            <div className="flex justify-center items-center px-4">
                <p className="text-4xl md:text-5xl font-extrabold text-center">Comience la Transformación Hoy. <span className="text-[#8d8159]">¡Inscriba a su Cadete!</span></p>
            </div>
        </div>
    )
}