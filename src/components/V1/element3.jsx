import React from "react";
import { useState, useEffect } from "react";
import fondo1 from "../img/fondo11.jpg";
import fondo2 from "../img/fondo9.jpg";
import fondo3 from "../img/fondo8.jpg";
import fondo4 from "../img/fondo7.jpg";
import fondo5 from "../img/fondo6.jpg";
import fondo6 from "../img/fondo5.jpg";
import fondo7 from "../img/fondo4.jpg";


const images = [
    {
      src: fondo1,
      description: `"La disciplina no es un castigo, es el camino hacia el éxito que pocos están dispuestos a recorrer."`,
    },
    {
      src: fondo2,
      description: `"Un verdadero líder inspira con respeto, actúa con integridad y guía con el ejemplo."`,
    },
    {
      src: fondo3,
      description: `"En la vida, como en el campo de batalla, los valores son tu brújula y la disciplina, tu arma más poderosa."`,
    },
    {
        src: fondo4,
        description: `"El respeto comienza contigo: cuando valoras tus acciones, el mundo aprende a respetarte."`,
    },
    {
        src: fondo5,
        description: `"La fortaleza no está en los músculos, sino en la voluntad de cumplir con tus principios incluso en los momentos más difíciles."`,
    },
    {
        src: fondo6,
        description: `"La disciplina transforma el esfuerzo constante en victorias duraderas."`,
    },  
  ];

export default function Element3() {
   
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 8000); // Cambiar cada 5 segundos
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="slider-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${image.src})` }}
          >
            <div className="description">{image.description}</div>
          </div>
        ))}
        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
            ></span>
          ))}
        </div>
      </div>
    );
}