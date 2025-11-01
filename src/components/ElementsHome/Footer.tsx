import type { FC } from 'react';

// Importando imágenes para el logo y redes sociales
import Logo from '../../img/icon.png';
import { Facebook, Instagram, Linkedin, MessageSquare, Youtube } from 'lucide-react';
import LogoCF from '../../assets/img/LogoCF.avif';


// Datos para los enlaces, facilitando su mantenimiento
const navLinks = [
  { href: '#', label: 'Inicio' },
  { href: '#', label: 'Cursos' },
  { href: '#', label: 'Testimonios' },
  { href: '#', label: 'Contacto' },
];

const resourceLinks = [
  { href: '#', label: 'Blog' },
  { href: '#', label: 'Política de Privacidad' },
  { href: '#', label: 'Términos de Servicio' },
];

const socialLinks = [
  { href: 'https://www.facebook.com/profile.php?id=61580625509432', icon: Facebook, alt: 'Facebook' },
  { href: 'https://www.facebook.com/profile.php?id=61580625509432', icon: Instagram, alt: 'Instagram' },
  { href: 'https://www.tiktok.com/@cadetesdelfuturo?is_from_webapp=1&sender_device=pc', icon: Youtube, alt: 'TIKTOK' },
];

const Footer: FC = () => {
  return (
    <footer style={{ backgroundColor: '#171717' }} className="text-gray-300">
      <div className="container mx-auto px-6 py-12">
        {/* Contenedor principal con layout de columnas responsivas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* 1. Sección de Branding y Redes Sociales */}
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <img src={LogoCF} alt="RG Technology Logo" className="h-15 w-auto" />
              <span className="ml-3 text-xl font-bold text-white">Cadetes del futuro</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Formando a los líderes del futuro con disciplina, honor y tecnología.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a key={social.alt} href={social.href} className="hover:opacity-75 transition-opacity duration-300">
                  <social.icon className="h-6 w-6"  />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Sección de Navegación */}
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: '#8d8159' }}>Navegación</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors duration-300 text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Sección de Recursos */}
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: '#8d8159' }}>Recursos</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors duration-300 text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Sección de Contacto */}
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: '#8d8159' }}>Contacto</h3>
            <address className="not-italic text-sm space-y-2">
              <p>Lago Agrio, Ecuador</p>
              <a href="mailto:info@rgtechnology.com" className="hover:text-white transition-colors duration-300 block">
                rg-t_admin@cadetesdelfuturo.com
              </a>
            </address>
          </div>

        </div>
      </div>

      {/* Barra inferior de Copyright */}
      <div className="py-4" style={{ borderTop: '1px solid #46412d' }}>
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} RG Technology. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500 mt-2 sm:mt-0">
            Creado por | <span style={{ color: '#8d8159' }}>rg technology</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;