import Lanyard from "@/hooks/gsap/Lanyard";
import ElementProductos from "./ElementProductos";
export default function ElementoSeis(){
    return(
        <div className="text-white mb-15">
            <div className=" flex justify-center items-center mb-8">
                <h2 className="text-5xl font-extrabold">Inversión en el <span className="text-[#8d8159]">Futuro de su Hijo</span></h2>
            </div>
            <div className=" px-4 md:px-14  py-2 md:py-7 space-y-5">
                <p className="text-2xl font-bold"><span className="bg-amber-50 rounded-full py-1 px-3 text-xl">.</span> Curso de un año, dividido en 3 niveles de 4 meses cada uno.</p>
                <p className="text-2xl font-bold"><span className="bg-amber-50 rounded-full py-1 px-3 text-xl">.</span> Inversión Total: $60 (Compuesto por $35 de matrícula y $25 de pensión)</p>
                <p className="text-2xl font-bold"><span className="bg-amber-50 rounded-full py-1 px-3 text-xl">.</span> Certificado digital e Ingreso a plataforma mediante carnet.</p>
            </div>
            {/*Carnet*/}
            <Lanyard />
            <ElementProductos/>
            <div className="flex justify-center items-center">
                <p className="text-4xl font-extrabold">Comience la Transformación Hoy. <span className="text-[#8d8159]">¡Inscriba a su Cadete!</span></p>
            </div>
        </div>
    )
}