import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/ElementsHome/Footer";
import { ClipboardList, Wallet, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';

const faqItems = [
    {
        question: "¿Tienen información sobre los niveles?",
        answer: "Sí, el programa cubre tres niveles de cuatro meses cada uno: Cadete Aspirante (base militar), Cadete en Formación (habilidades sociales) y Cadete Especialista (preparación para el mundo moderno)."
    },
    {
        question: "¿Cómo funciona la tecnología en el programa?",
        answer: "Utilizamos una plataforma educativa gamificada y herramientas de Inteligencia Artificial (IA) para gestionar notas, actividades, tarjetas de estudio personalizadas y calendarios dinámicos, haciendo el aprendizaje más interactivo y eficiente."
    },
    {
        question: "¿Qué habilidades prácticas se aprenden?",
        answer: "El temario es amplio e incluye liderazgo colaborativo, primeros auxilios, defensa personal, finanzas personales, supervivencia, orientación con brújula y mapas, y ética digital, entre otras."
    }
];

export default function Contactanos() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return (
        <div className=" text-white min-h-screen flex flex-col">
            {/* Navigation */}
            <div className="w-full absolute top-0 left-0 z-50 flex justify-center">
                <div className='relative flex flex-col w-full max-w-7xl px-4 mt-8'>
                    <div className='relative bg-white/10 backdrop-blur-md rounded-full px-6 h-14 flex w-full items-center justify-between'>
                        <Link to="/" className='flex items-center'>
                            <span className='text-xl font-extrabold text-[#8d8159] opacity-80 hover:opacity-100 transition-opacity'>rg technology</span>
                        </Link>
                        
                        <div className='hidden md:flex items-center space-x-6 font-bold text-base'>
                            <Link to="/productos" className='hover:text-[#8d8159] transition-colors'>Productos</Link>
                            <Link to="/nosotros" className='hover:text-[#8d8159] transition-colors'>Nosotros</Link>
                            <Link to="/contactanos" className='text-[#8d8159] border-b-1'>Contáctanos</Link>
                            <Button asChild className='bg-transparent text-[#8d8159] font-bold hover:bg-[#8d8159] hover:text-black transition-all duration-300'>
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
                                <Link to="/nosotros" className='hover:text-[#8d8159] transition-colors'>Nosotros</Link>
                                <Link to="/contactanos" className='text-[#8d8159]'>Contáctanos</Link>
                                <Button asChild className='bg-transparent border border-[#8d8159] text-[#8d8159] font-bold w-3/4 hover:bg-[#8d8159] hover:text-black transition-all duration-300'>
                                    <Link to="/seccion/login">Login</Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                                ¡Prepárense para el futuro! <br />
                                <span className="text-[#d4c284]">Inicia la Transformación de tu Cadete Hoy.</span>
                            </h1>
                            <p className="mt-6 text-lg text-neutral-300 max-w-lg mx-auto md:mx-0">
                                ¿Listo para que tu hijo o hija forme parte de un programa que combina la disciplina militar juvenil con las competencias digitales del Siglo XXI? Nuestro equipo está disponible para resolver tus dudas y guiarte en el proceso de inscripción.
                            </p>
                        </div>

                        <div className="bg-[#1a1a1a] p-8 rounded-lg border border-neutral-800 shadow-2xl">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-white">Formulario de Contacto</h3>
                                <p className="text-sm text-neutral-400 mt-2">Pregúntanos sobre la IA, la gamificación, o el temario de Supervivencia y Ética Digital.</p>
                            </div>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="parent-name" className="text-neutral-300">Nombre del Padre/Madre</Label>
                                        <Input id="parent-name" type="text" placeholder="John Doe" className="mt-2 bg-neutral-900 border-neutral-700 text-white" />
                                    </div>
                                    <div>
                                        <Label htmlFor="cadet-name" className="text-neutral-300">Nombre del Aspirante</Label>
                                        <Input id="cadet-name" type="text" placeholder="Jane Doe" className="mt-2 bg-neutral-900 border-neutral-700 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="email" className="text-neutral-300">Email</Label>
                                    <Input id="email" type="email" placeholder="tu@email.com" className="mt-2 bg-neutral-900 border-neutral-700 text-white" />
                                </div>
                                <div>
                                    <Label htmlFor="phone" className="text-neutral-300">Teléfono</Label>
                                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-2 bg-neutral-900 border-neutral-700 text-white" />
                                </div>
                                <div>
                                    <Label htmlFor="message" className="text-neutral-300">Mensaje</Label>
                                    <Textarea id="message" placeholder="Escribe tu consulta aquí..." className="mt-2 bg-neutral-900 border-neutral-700 text-white" rows={4} />
                                </div>
                                <div>
                                    <Button type="submit" className="w-full bg-[#8d8159] text-black font-bold hover:bg-[#a4956a] transition-colors duration-300">Enviar Mensaje</Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="mt-24 pt-16 border-t border-neutral-800">
                        <div className="text-center mb-12"><h2 className="text-4xl md:text-5xl font-bold text-[#8d8159]">Información Esencial</h2></div>
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                            <div className="bg-[#1a1a1a] p-8 rounded-lg border border-neutral-800 h-full">
                                <div className="flex items-center mb-6"><ClipboardList className="w-8 h-8 text-[#8d8159] mr-4 flex-shrink-0" /><h3 className="font-bold text-2xl">Detalles Clave del Programa</h3></div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-neutral-700 pb-3"><span className="text-neutral-400">Edad de los Aspirantes</span><span className="font-semibold">8 a 17 años</span></div>
                                    <div className="flex justify-between items-center border-b border-neutral-700 pb-3"><span className="text-neutral-400">Duración del Curso</span><span className="font-semibold">1 año (3 niveles)</span></div>
                                    <div className="flex justify-between items-center border-b border-neutral-700 pb-3"><span className="text-neutral-400">Ejes de Formación</span><span className="font-semibold">Disciplina y Tecnología</span></div>
                                    <div className="flex justify-between items-center"><span className="text-neutral-400">Modalidad</span><span className="font-semibold">Presencial y Híbrido</span></div>
                                </div>
                            </div>
                            <div className="bg-[#1a1a1a] p-8 rounded-lg border border-neutral-800 h-full">
                                <div className="flex items-center mb-6"><Wallet className="w-8 h-8 text-[#8d8159] mr-4 flex-shrink-0" /><h3 className="font-bold text-2xl">Inversión</h3></div>
                                <p className="text-neutral-400 mb-6">La formación de jóvenes íntegros, disciplinados y resilientes tiene un costo claro y transparente:</p>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center bg-neutral-900/50 p-4 rounded-md"><span className="text-neutral-300">Matrícula Inicial</span><span className="font-bold text-xl text-[#d4c284]">$35</span></div>
                                    <div className="flex justify-between items-center bg-neutral-900/50 p-4 rounded-md"><span className="text-neutral-300">Pensión Mensual</span><span className="font-bold text-xl text-[#d4c284]">$25</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-24 pt-16 border-t border-neutral-800">
                        <div className="text-center mb-12"><h2 className="text-4xl md:text-5xl font-bold text-[#8d8159]">Canales de Comunicación Directa</h2></div>
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-[#1a1a1a] p-8 rounded-lg border border-neutral-800 text-center flex flex-col items-center"><Mail className="w-10 h-10 text-[#8d8159] mb-4" /><h4 className="font-bold text-xl mb-2">Correo Electrónico</h4><p className="text-neutral-400 text-sm mb-4">Para dudas administrativas, registro, o preguntas sobre recursos digitales.</p><p className="font-mono text-amber-400/80 italic mb-4">rg-t_admin@rgtechnology.com</p><Button variant="outline" className="w-full border-[#8d8159] text-[#8d8159] hover:bg-[#8d8159] hover:text-black transition-colors">Enviar Email</Button></div>
                            <div className="bg-[#1a1a1a] p-8 rounded-lg border border-neutral-800 text-center flex flex-col items-center"><Phone className="w-10 h-10 text-[#8d8159] mb-4" /><h4 className="font-bold text-xl mb-2">Número Telefónico</h4><p className="text-neutral-400 text-sm mb-4">Para comunicación inmediata y preguntas sobre logística de actividades presenciales.</p><p className="font-mono text-amber-400/80 italic mb-4">+593979358299</p><Button variant="outline" className="w-full border-[#8d8159] text-[#8d8159] hover:bg-[#8d8159] hover:text-black transition-colors">Llamar Ahora</Button></div>
                            <div className="bg-[#1a1a1a] p-8 rounded-lg border border-neutral-800 text-center flex flex-col items-center"><MapPin className="w-10 h-10 text-[#8d8159] mb-4" /><h4 className="font-bold text-xl mb-2">Ubicación Física</h4><p className="text-neutral-400 text-sm mb-4">Para coordinar la visita psicológica y las actividades presenciales.</p><p className="font-mono text-amber-400/80 italic mb-4">Lago Agrio</p><Button variant="outline" className="w-full border-[#8d8159] text-[#8d8159] hover:bg-[#8d8159] hover:text-black transition-colors">Ver en Mapa</Button></div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-24 pt-16 border-t border-neutral-800">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#8d8159]">Preguntas Frecuentes</h2>
                        </div>
                        <div className="max-w-4xl mx-auto space-y-4">
                            {faqItems.map((item, index) => (
                                <Collapsible key={index} className="border-b border-neutral-800">
                                    <CollapsibleTrigger className="flex justify-between items-center w-full text-left py-4">
                                        <span className="text-lg font-semibold">{item.question}</span>
                                        <ChevronDown className="h-5 w-5 transition-transform duration-300" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pb-4 pr-4">
                                        <p className="text-neutral-300">{item.answer}</p>
                                    </CollapsibleContent>
                                </Collapsible>
                            ))}
                        </div>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}