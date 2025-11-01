import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/ElementsHome/Footer";
import { ShieldCheck, Cpu, BrainCircuit, Gamepad2, Network, CheckCircle2, Users, Sparkles } from 'lucide-react';

export default function Nosotros() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return (
        <div className="text-white">
            {/* Navigation */}
            <div className="w-full absolute top-0 left-0 z-50 flex justify-center">
                <div className='relative flex flex-col w-full max-w-7xl px-4 mt-8'>
                    <div className='relative bg-white/10 backdrop-blur-md rounded-full px-6 h-14 flex w-full items-center justify-between font-bold'>
                        <Link to="/" className='flex items-center'>
                            <span className='text-xl font-extrabold text-[#8d8159] opacity-80 hover:opacity-100 transition-opacity'>rg technology</span>
                        </Link>
                        
                        <div className='hidden md:flex items-center space-x-6 text-base'>
                            <Link to="/productos" className='hover:text-[#8d8159] transition-colors'>Productos</Link>
                            <Link to="/nosotros" className='text-[#8d8159] border-b-1'>Nosotros</Link>
                            <Link to="/contactanos" className='hover:text-[#8d8159] transition-colors'>Contáctanos</Link>
                            <Button asChild className='bg-transparent  text-[#8d8159] font-bold hover:bg-[#8d8159] hover:text-black transition-all duration-300'>
                                <Link to="/seccion/login">Login</Link>
                            </Button>
                        </div>

                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />}
                                </svg>
                            </button>
                        </div>
                    </div>
                    {isMenuOpen && (
                        <div className="md:hidden absolute top-16 left-0 w-full mt-2">
                            <div className="bg-black/90 rounded-lg shadow-lg py-4 flex flex-col items-center space-y-4">
                                <Link to="/productos" className='hover:text-[#8d8159] transition-colors'>Productos</Link>
                                <Link to="/nosotros" className='text-[#8d8159]'>Nosotros</Link>
                                <Link to="/contactanos" className='hover:text-[#8d8159] transition-colors'>Contáctanos</Link>
                                <Button asChild className='bg-transparent border border-[#8d8159] text-[#8d8159] font-bold w-3/4 hover:bg-[#8d8159] hover:text-black transition-all duration-300'>
                                    <Link to="/seccion/login">Login</Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center px-4">
                <div className="absolute inset-0 "></div>
                <img src="/src/assets/img/fondo2.avif" alt="Cadetes entrenando" className="absolute inset-0 w-full h-full object-cover opacity-35"/>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                        Cadetes del Futuro: <span className="text-[#d4c284]">Forjando Jóvenes Íntegros,</span>
                        <br />
                        <span className="text-[#d4c284]">Disciplinados</span> y Digitalmente <span className="text-[#d4c284]">Competentes.</span>
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                
                {/* Nuestra Esencia */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#8d8159]">Nuestra Esencia</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-neutral-300">
                        Cadetes del Futuro es un programa innovador dirigido a niños y jóvenes, que combina la disciplina juvenil con el desarrollo personal, el liderazgo colaborativo y las competencias digitales del siglo XXI.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    {/* Objetivo Central */}
                    <div className="bg-[#1a1a1a] p-8 rounded-lg border border-neutral-800 shadow-lg">
                        <h3 className="text-3xl font-bold text-[#8d8159] mb-4">Objetivo Central</h3>
                        <p className="text-neutral-300 text-lg">
                            Nuestro objetivo fundamental es formar jóvenes íntegros, disciplinados y resilientes, capaces de asumir liderazgo en entornos físicos y digitales. Buscamos que los estudiantes desarrollen nuevas fortalezas en liderazgo, disciplina y trabajo en equipo.
                        </p>
                    </div>

                    {/* Imagen */}
                    <div className="h-80 rounded-lg overflow-hidden">
                        <img src="/src/assets/img/Soldado4.avif" alt="Instructor y cadete" className="w-full h-full object-contain"/>
                    </div>
                </div>

                {/* Los Ejes y Público */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {/* Los Ejes */}
                    <div className="md:col-span-2 bg-[#1a1a1a] p-8 rounded-lg border border-neutral-800 shadow-lg">
                        <h3 className="text-3xl font-bold text-[#8d8159] mb-6">Los Ejes del Programa</h3>
                        <p className="text-neutral-300 text-lg mb-6">
                            El programa se estructura sobre dos ejes de aprendizaje clave, guiados por un Instructor militar profesional por servicio pasivo.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                            <div className="flex-1 flex items-center p-4 bg-[#222] rounded-md border border-neutral-700">
                                <ShieldCheck className="w-10 h-10 text-[#8d8159] mr-4" />
                                <div>
                                    <h4 className="font-bold text-xl">Disciplina</h4>
                                    <p className="text-neutral-400">Formación de carácter y resiliencia.</p>
                                </div>
                            </div>
                            <div className="flex-1 flex items-center p-4 bg-[#222] rounded-md border border-neutral-700">
                                <Cpu className="w-10 h-10 text-[#8d8159] mr-4" />
                                <div>
                                    <h4 className="font-bold text-xl">Tecnología</h4>
                                    <p className="text-neutral-400">Competencias digitales para el futuro.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Público Objetivo */}
                    <div className="bg-[#8d8159] text-black p-8 rounded-lg flex flex-col justify-center items-center text-center shadow-lg">
                        <h3 className="text-3xl font-bold mb-2">Público Objetivo</h3>
                        <p className="text-6xl font-extrabold tracking-tighter">8-17</p>
                        <p className="font-semibold text-lg">Años</p>
                        <p className="mt-2">Aspirantes con vocación de liderazgo y superación.</p>
                    </div>
                </div>

                {/* Metodología Innovadora y Tecnología */}
                <div className="text-center pt-16 border-t border-neutral-800">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#8d8159]">Metodología Innovadora y Tecnología</h2>
                    <p className="mt-4 text-xl text-neutral-300 font-light">Una Experiencia Educativa Impulsada por la IA y la Gamificación.</p>
                    <p className="mt-6 max-w-4xl mx-auto text-lg text-neutral-400">
                        El programa es acompañado por una plataforma educativa gamificada y herramientas impulsadas por Inteligencia Artificial (IA), enfocadas en la organización académica y el seguimiento del progreso. La plataforma ofrece una experiencia interactiva que incluye:
                    </p>
                </div>

                <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
                    <div className="bg-[#1a1a1a] p-6 rounded-lg border border-neutral-800 h-full flex flex-col">
                        <div className="flex items-center mb-4">
                            <BrainCircuit className="w-10 h-10 text-[#8d8159] mr-4 flex-shrink-0" />
                            <h4 className="font-bold text-2xl">Aprendizaje con IA</h4>
                        </div>
                        <p className="text-neutral-300">Blog de notas inteligente, tarjetas de estudio personalizadas y un calendario dinámico.</p>
                    </div>
                    <div className="bg-[#1a1a1a] p-6 rounded-lg border border-neutral-800 h-full flex flex-col">
                        <div className="flex items-center mb-4">
                            <Gamepad2 className="w-10 h-10 text-[#8d8159] mr-4 flex-shrink-0" />
                            <h4 className="font-bold text-2xl">Herramientas Gamificadas</h4>
                        </div>
                        <p className="text-neutral-300">Asignación de tareas y retos, insignias digitales y un ranking de los mejores aspirantes.</p>
                    </div>
                    <div className="bg-[#1a1a1a] p-6 rounded-lg border border-neutral-800 h-full flex flex-col">
                        <div className="flex items-center mb-4">
                            <Network className="w-10 h-10 text-[#8d8159] mr-4 flex-shrink-0" />
                            <h4 className="font-bold text-2xl">Conexión y Seguimiento</h4>
                        </div>
                        <p className="text-neutral-300">Red social interna, seguimiento de proyectos y avances, y certificados digitales con QR.</p>
                    </div>
                </div>

                {/* Desarrollo Integral Section */}
                <div className="pt-24 mt-24 border-t border-neutral-800">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#8d8159]">Desarrollo Integral</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-300">
                            El programa tiene una duración de un año y se divide en tres niveles, cada uno con una duración de cuatro meses.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Nivel 1 */}
                        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-neutral-800 flex flex-col h-full">
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="font-semibold text-sm text-[#8d8159]">Primer Nivel</p>
                                        <h4 className="font-bold text-2xl">Cadete Aspirante</h4>
                                    </div>
                                    <span className="bg-blue-600/20 text-blue-300 text-xs font-bold px-2.5 py-1 rounded-full">Presencial</span>
                                </div>
                                <p className="text-neutral-400 mb-4">Se enfoca en la disciplina y la base militar.</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />Instrucción formal y marchas</li>
                                    <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />Natación</li>
                                    <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />Visita psicológica</li>
                                </ul>
                            </div>
                        </div>

                        {/* Nivel 2 */}
                        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-neutral-800 flex flex-col h-full">
                             <div className="flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="font-semibold text-sm text-[#8d8159]">Segundo Nivel</p>
                                        <h4 className="font-bold text-2xl">Cadete en Formación</h4>
                                    </div>
                                    <span className="bg-blue-600/20 text-blue-300 text-xs font-bold px-2.5 py-1 rounded-full">Presencial</span>
                                </div>
                                <p className="text-neutral-400 mb-4">Desarrollo de habilidades sociales y personales avanzadas.</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />Liderazgo colaborativo</li>
                                    <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />Rutinas efectivas y hábitos</li>
                                    <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />Primeros auxilios</li>
                                    <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />Defensa personal</li>
                                </ul>
                            </div>
                        </div>

                        {/* Nivel 3 */}
                        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-neutral-800 flex flex-col h-full">
                             <div className="flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="font-semibold text-sm text-[#8d8159]">Tercer Nivel</p>
                                        <h4 className="font-bold text-2xl">Cadete Especialista</h4>
                                    </div>
                                    <span className="bg-amber-600/20 text-amber-300 text-xs font-bold px-2.5 py-1 rounded-full">Híbrido</span>
                                </div>
                                <p className="text-neutral-400 mb-4">Preparación para el mundo moderno y situaciones extremas.</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />Supervivencia y orientación</li>
                                    <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />Liderazgo en entornos virtuales</li>
                                    <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />Finanzas personales</li>
                                    <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />Ética y reputación digital</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}
