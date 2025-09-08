import React, {useState, useEffect} from "react";
import Publicidad1 from "../img/publicidad1.png";
import Publicidad2 from "../img/publicidad2.png";
import Publicidad3 from "../img/publicidad3.png";

const images = [
    {
        src:Publicidad1,
    },
    {
        src:Publicidad2,
    },
    {
        src:Publicidad3,
    }
];

export default function Publicidad() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);
    

    return (
        <div className="publicidad">
            <div className="header">
                <h2>Tambien <span>ofertamos:</span></h2>
            </div>
            <div className="content">
                <div className="slider-container-2">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`slide-2 ${index === currentIndex ? "active" : ""}`}
                            style={{ backgroundImage: `url(${image.src})` }}
                        >
                        </div>
                    ))}
                    <div className="dots-2">
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={`dot-2 ${index === currentIndex ? "active" : ""}`}
                            ></span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}