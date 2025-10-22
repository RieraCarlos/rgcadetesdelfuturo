import { Button } from "../../../components/ui/button"
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/ElementsHome/ElementUno";
import Element1 from "../../../components/V1/element1.jsx";
import ContentSection from "@/components/ElementsHome/ElementDos";
import ContactSection from "@/components/ElementsHome/Footer";
import CourseView from "@/components/ElementsHome/ElementTres";
import CenteredContent from "@/components/ElementsHome/ElementCuatro";
import HorizontalScroll from "@/components/ElementsHome/ElementCinco";
import TestimonialsScroll from "@/components/ElementsHome/Testimonios";
import ScrollVelocity from '../../../hooks/gsap/ScrollVelocity';
import Empresas from "@/components/ElementsHome/Empresas";
import ElementCmejores from "@/components/ElementsHome/ElementCmejores";
import ElementoSeis from "@/components/ElementsHome/ElementSeis";
import FormContactanos from "@/components/ElementsHome/FormContactanos";
export default function Home() {
    const navigate = useNavigate();
    return (
        <>
            <HeroSection/>
            <ContentSection/>
            <HorizontalScroll/>
            <ElementCmejores/>
            <ScrollVelocity
                texts={['Disciplina - Lealtad - Profesionalismo -', 'Honor - Valor - Patriotismo -']} 
                velocity={100} 
                className="custom-scroll-text text-[#242424] font-extrabold"
            />
            <CenteredContent/>
            <CourseView/>
            <div className="flex flex-col mb-25">
                <span className="text-[#8d8159] text-5xl font-extrabold text-center mb-12">Marcas que nos apoyan</span>
                <ScrollVelocity
                    texts={['rg technology', 'ssedee']} 
                    velocity={100} 
                    className="custom-scroll-text text-white opacity-15 h-25"
                />
            </div>
            <ElementoSeis/>
            <FormContactanos/>
            <TestimonialsScroll/>

            <ContactSection/>
        </>
        
    )
}