import { useState, useEffect } from 'react';
import type { FC } from 'react';

// Importa las imágenes que necesites. Usaré algunas de las que vi en tu proyecto.
import Producto1 from '../../assets/img/P-T.avif';
import Producto2 from '../../assets/img/P-C.avif';
import Producto3 from '../../assets/img/P-F.avif';
import Producto4 from '../../assets/img/P-SB.avif';


// Definimos el tipo para nuestros productos para mayor claridad y seguridad de tipos.
type Producto = {
  id: number;
  nombre: string;
  caracteristicas: string[];
  imagen: string;
};

// Datos de ejemplo para los productos
const productos: Producto[] = [
  {
    id: 1,
    nombre: 'Tarjetas de estudio con IA',
    caracteristicas: [
      'Personalización del aprendizaje',
      'Organización y Seguimiento',
      'Experiencia Interactiva',
      'Desarrollo de Competencias Digitales',
    ],
    imagen: Producto1,
  },
  {
    id: 2,
    nombre: 'Calendario interactivo',
    caracteristicas: [
      'Organización Académica',
      'Gestión de Actividades',
      'Seguimiento del Progreso',
      'Fomento de Rutinas Efectivas',
    ],
    imagen: Producto2,
  },
  {
    id: 3,
    nombre: 'Herramienta de finanzas personales',
    caracteristicas: [
      'Enseñanza de Habilidades Financieras Prácticas',
      'Desarrollo de Competencias Digitales',
      'Experiencia Interactiva',
      'Formación Integral',
    ],
    imagen: Producto3,
  },
  {
    id: 4,
    nombre: 'Proximamente: SuperBen',
    caracteristicas: [
      'Motivación y Reconocimiento',
      'Competencia Positiva',
      'Soporte para la Organización Académica y el Progreso',
      'Desarrollo de Competencias Digitales e Integrales',
    ],
    imagen: Producto4,
  },
];

const ElementProductos: FC = () => {
  const [productoActual, setProductoActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setProductoActual((prev) => (prev + 1) % productos.length);
    }, 7000); // Cambia de producto cada 5 segundos

    return () => clearInterval(intervalo); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <section className=" text-white overflow-hidden">
      <div className="mx-auto px-4 mb-10">
        <h2 
          style={{ color: '#FFFFFF' }} 
          className="text-4xl md:text-5xl font-extrabold text-center mb-8"
        >
          Producto gratis por ser parte del curso
        </h2>

        <div className="relative h-auto min-h-140 md:min-h-[20rem] w-full max-w-5xl mx-auto">
          {productos.map((producto, index) => (
            <div
              key={producto.id}
              className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out ${productoActual === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
              style={{ transform: productoActual === index ? 'translateY(0)' : (index < productoActual ? 'translateY(-100%)' : 'translateY(100%)') }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 items-center h-full">
                {/* Sección de la imagen (arriba en móvil, derecha en desktop) */}
                <div className="order-first md:order-last flex justify-center items-center h-full">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre} 
                    className="max-h-60 md:max-h-80 object-contain"
                  />
                </div>

                {/* Sección de características (abajo en móvil, izquierda en desktop) */}
                <div style={{ color: '#FFFFFF' }} className="order-last md:order-first px-2">
                  <h3 style={{ color: '#8d8159' }} className="text-2xl font-bold mb-4">{producto.nombre}</h3>
                  <p style={{ color: '#8d8159' }} className="">Beneficios:</p>
                  <ul className="space-y-2">
                    {producto.caracteristicas.map((caracteristica, i) => (
                      <li key={i} className="flex items-center">
                        <svg style={{ color: '#46412d' }} className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>{caracteristica}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElementProductos;
