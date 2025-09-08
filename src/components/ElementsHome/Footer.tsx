// src/components/ContactSection.tsx
import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <div className="bg-neutral-900 text-white p-8 md:p-16">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-16">
        {/* Contact Information */}
        <div className="flex flex-col text-lg space-y-2 md:space-y-4 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Contactanos</h2>
          <a href="#" className="hover:text-orange-400 transition-colors">Whatsapp</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Facebook</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Instagram</a>
        </div>

        {/* Large Text Block */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12">
          <span className="text-3xl sm:text-4xl md:text-6xl font-extrabold opacity-15">CURSO DE CADETES DEL FUTURO</span>
          <span className=' w-full text-end text-5xl font-extrabold text-black'>Start Good</span>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;