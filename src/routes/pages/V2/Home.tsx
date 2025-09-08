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

export default function Home() {
    const navigate = useNavigate();
    return (
        <>
            <Element1/>
            <ContentSection/>
            <HorizontalScroll/>
            <ScrollVelocity
                texts={['Disciplina - Lealtad - Profesionalismo -', 'Honor - Valor - Patriotismo -']} 
                velocity={100} 
                className="custom-scroll-text text-white opacity-15"
            />
            <CenteredContent/>
            <CourseView/>
            <div className="flex flex-col">
                <span className="text-[#ffcc01] text-5xl font-bold text-center mb-12 opacity-45">Empresas que apoyan el curso</span>
                <ScrollVelocity
                    texts={['Start Good', '']} 
                    velocity={100} 
                    className="custom-scroll-text text-white opacity-15"
                />
            </div>
            <TestimonialsScroll/>
            <ContactSection/>
        </>
        
    )
}