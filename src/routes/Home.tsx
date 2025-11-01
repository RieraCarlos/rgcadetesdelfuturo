import HeroSection from "@/components/ElementsHome/ElementUno";
import ContentSection from "@/components/ElementsHome/ElementDos";
import ContactSection from "@/components/ElementsHome/Footer";
import CourseView from "@/components/ElementsHome/ElementTres";
import CenteredContent from "@/components/ElementsHome/ElementCuatro";
import HorizontalScroll from "@/components/ElementsHome/ElementCinco";
import TestimonialsScroll from "@/components/ElementsHome/Testimonios";
import ScrollVelocity from '../hooks/gsap/ScrollVelocity';
import Empresas from "@/components/ElementsHome/Empresas";
import ElementCmejores from "@/components/ElementsHome/ElementCmejores";
import ElementoSeis from "@/components/ElementsHome/ElementSeis";
import FormContactanos from "@/components/ElementsHome/FormContactanos";
export default function Home() {
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
                    className="custom-scroll-text text-white opacity-15 "
                />
            </div>
            <ElementoSeis/>
            <FormContactanos/>
            <TestimonialsScroll/>

            <ContactSection/>
        </>
        
    )
}