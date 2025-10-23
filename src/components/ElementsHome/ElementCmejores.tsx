import Soldado1 from "../../img/Soldado1.png";
import Soldado2 from "../../img/Soldado2P.png";
import Soldado3 from "../../img/Soldado3.png";
import Soldado4 from "../../img/Soldado4.png";
import Soldado5 from "../../img/Soldado5.png";
import Soldado6 from "../../img/Soldado6.png";
import Soldado7 from "../../img/Soldado7.png";
import Soldado8 from "../../img/Soldado8.png";
import Soldado9 from "../../img/Soldado9.png";
import Soldado10 from "../../img/Soldado10.png";
import Instructor1 from "../../img/Instructor1.png"
import Instructor2 from "../../img/Instructor2.png";
import TiltedCard from "@/hooks/gsap/TiltedCard";
export default function ElementCmejores(){
    return(
        <>
            <div className="text-white flex justify-center mb-8">
                <h2 className="text-5xl md:text-6xl font-extrabold">Conócenos<span className=" text-[#8d8159]">...</span></h2>
            </div>
            {/*---Instructores---*/}
            <div className="px-4 md:px-14 mb-7">
                <div className="text-white flex justify-start mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold">Nuestros <span className=" text-[#8d8159]">instructores</span></h2>
                </div>
                <div className="flex justify-evenly">
                    <TiltedCard
                        imageSrc={Instructor1}
                        altText="SGT. EDDER PRADO"
                        captionText="SGT. EDDER PRADO"
                        containerHeight="250px"
                        containerWidth="170px"
                        imageHeight="250px"
                        imageWidth="170px"
                        rotateAmplitude={12}
                        scaleOnHover={1.05}
                        showMobileWarning={false}
                        showTooltip={true}
                        displayOverlayContent={true}
                        overlayContent={
                            <p className="text-xs text-white font-bold rounded-lg p-1.5 bg-gradient-to-r from-[#767574] to-transparent filter drop-shadow-[0_15px_15px_rgba(118,117,116,0.6)] transform hover:scale-105 transition duration-300">
                                SGT. EDDER PRADO
                            </p>
                        }
                    />
                    <TiltedCard
                        imageSrc={Instructor2}
                        altText="CDT. CARLA RIERA"
                        captionText="CDT. CARLA RIERA"
                        containerHeight="250px"
                        containerWidth="170px"
                        imageHeight="250px"
                        imageWidth="170px"
                        rotateAmplitude={12}
                        scaleOnHover={1.05}
                        showMobileWarning={false}
                        showTooltip={true}
                        displayOverlayContent={true}
                        overlayContent={
                            <p className="text-xs text-white font-bold rounded-lg p-1.5 bg-gradient-to-r from-[#767574] to-transparent filter drop-shadow-[0_15px_15px_rgba(118,117,116,0.6)] transform hover:scale-105 transition duration-300">
                                CDT. CARLA RIERA
                            </p>
                        }
                    />
                </div>
            </div>
            {/*---Estudiantes---*/}
            <div className="px-4 md:px-14 mb-10">
                <div className="text-white flex justify-start">
                    <h2 className="text-3xl md:text-4xl font-bold">Los 10 mejores <span className=" text-[#8d8159]">aspirantes</span></h2>
                </div>
                <div className="content-card1">
                    <TiltedCard
                        imageSrc={Soldado1}
                        altText="ANTHONELLA ROXELL TOCTO QUEREVALU🪖"
                        captionText="ANTHONELLA ROXELL TOCTO QUEREVALU🪖"
                        containerHeight="250px"
                        containerWidth="170px"
                        imageHeight="250px"
                        imageWidth="170px"
                        rotateAmplitude={12}
                        scaleOnHover={1.05}
                        showMobileWarning={false}
                        showTooltip={true}
                        displayOverlayContent={true}
                        overlayContent={
                            <p className="text-xs text-white font-bold rounded-lg p-1.5 bg-gradient-to-r from-[#767574] to-transparent filter drop-shadow-[0_15px_15px_rgba(118,117,116,0.6)] transform hover:scale-105 transition duration-300">
                                ANTHONELLA TOCTO Q.
                            </p>
                        }
                    />
                    
                    <div className="fila fila-2">
                        <TiltedCard
                            imageSrc={Soldado2}
                            altText="BERNARDO ISMAEL RODRIGUEZ SANTOS🪖"
                            captionText="BERNARDO ISMAEL RODRIGUEZ SANTOS🪖"
                            containerHeight="250px"
                            containerWidth="170px"
                            imageHeight="250px"
                            imageWidth="170px"
                            rotateAmplitude={12}
                            scaleOnHover={1.05}
                            showMobileWarning={false}
                            showTooltip={true}
                            displayOverlayContent={true}
                            overlayContent={
                                <p className="text-xs text-white font-bold rounded-lg p-1.5  bg-gradient-to-r from-[#767574] to-transparent filter drop-shadow-[0_15px_15px_rgba(118,117,116,0.6)] transform hover:scale-105 transition duration-300">
                                    BERNARDO RODRIGUEZ S.
                                </p>
                            }
                        />
                        <TiltedCard
                            imageSrc={Soldado3}
                            altText="ALEXIS ANIBAL GOMEZ SANCHEZ🪖"
                            captionText="ALEXIS ANIBAL GOMEZ SANCHEZ🪖"
                            containerHeight="250px"
                            containerWidth="170px"
                            imageHeight="250px"
                            imageWidth="170px"
                            rotateAmplitude={12}
                            scaleOnHover={1.05}
                            showMobileWarning={false}
                            showTooltip={true}
                            displayOverlayContent={true}
                            overlayContent={
                                <p className="text-xs text-white font-bold rounded-lg p-1.5  bg-gradient-to-r from-[#767574] to-transparent filter drop-shadow-[0_15px_15px_rgba(118,117,116,0.6)] transform hover:scale-105 transition duration-300">
                                    ALEXIS GOMEZ S.
                                </p>
                            }
                        />
                    </div>
                    <div className="fila fila-3">
                        <TiltedCard
                            imageSrc={Soldado4}
                            altText="TORRES VASQUEZ JUAN MARCELO🪖"
                            captionText="TORRES VASQUEZ JUAN MARCELO🪖"
                            containerHeight="250px"
                            containerWidth="170px"
                            imageHeight="250px"
                            imageWidth="170px"
                            rotateAmplitude={12}
                            scaleOnHover={1.05}
                            showMobileWarning={false}
                            showTooltip={true}
                            displayOverlayContent={true}
                            overlayContent={
                                <p className="text-xs text-white font-bold rounded-lg p-1.5  bg-gradient-to-r from-[#767574] to-transparent filter drop-shadow-[0_15px_15px_rgba(118,117,116,0.6)] transform hover:scale-105 transition duration-300">
                                    JUAN TORRES V.
                                </p>
                            }
                        />
                        <TiltedCard
                            imageSrc={Soldado5}
                            altText="MILAN MALDONADO ALEXIS JOSUE🪖"
                            captionText="MILAN MALDONADO ALEXIS JOSUE🪖"
                            containerHeight="250px"
                            containerWidth="170px"
                            imageHeight="250px"
                            imageWidth="170px"
                            rotateAmplitude={12}
                            scaleOnHover={1.05}
                            showMobileWarning={false}
                            showTooltip={true}
                            displayOverlayContent={true}
                            overlayContent={
                                <p className="text-xs text-white font-bold rounded-lg p-1.5  bg-gradient-to-r from-[#767574] to-transparent filter drop-shadow-[0_15px_15px_rgba(118,117,116,0.6)] transform hover:scale-105 transition duration-300">
                                    ALEXIS MILAN M.
                                </p>
                            }
                        />
                        <TiltedCard
                            imageSrc={Soldado6}
                            altText="ALDANA AGUILAR IAN JEREMY🪖"
                            captionText="ALDANA AGUILAR IAN JEREMY🪖"
                            containerHeight="250px"
                            containerWidth="170px"
                            imageHeight="250px"
                            imageWidth="170px"
                            rotateAmplitude={12}
                            scaleOnHover={1.05}
                            showMobileWarning={false}
                            showTooltip={true}
                            displayOverlayContent={true}
                            overlayContent={
                                <p className="text-xs text-white font-bold rounded-lg p-1.5  bg-gradient-to-r from-[#767574] to-transparent filter drop-shadow-[0_15px_15px_rgba(118,117,116,0.6)] transform hover:scale-105 transition duration-300">
                                    IAN ALDANA A.
                                </p>
                            }
                        />
                    </div>
                    <div className="fila fila-4">
                        <TiltedCard
                            imageSrc={Soldado7}
                            altText="MATEO GABRIEL ASTUDILLO TORRES🪖"
                            captionText="MATEO GABRIEL ASTUDILLO TORRES🪖"
                            containerHeight="250px"
                            containerWidth="170px"
                            imageHeight="250px"
                            imageWidth="170px"
                            rotateAmplitude={12}
                            scaleOnHover={1.05}
                            showMobileWarning={false}
                            showTooltip={true}
                            displayOverlayContent={true}
                            overlayContent={
                                <p className="text-xs text-white font-bold rounded-lg p-1.5  bg-gradient-to-r from-[#767574] to-transparent filter drop-shadow-[0_15px_15px_rgba(118,117,116,0.6)] transform hover:scale-105 transition duration-300">
                                    MATEO ASTUDILLO T.
                                </p>
                            }
                        />
                        <TiltedCard
                            imageSrc={Soldado8}
                            altText="RODRIGUEZ MORALES ARELYS CRISLEY🪖"
                            captionText="RODRIGUEZ MORALES ARELYS CRISLEY🪖"
                            containerHeight="250px"
                            containerWidth="170px"
                            imageHeight="250px"
                            imageWidth="170px"
                            rotateAmplitude={12}
                            scaleOnHover={1.05}
                            showMobileWarning={false}
                            showTooltip={true}
                            displayOverlayContent={true}
                            overlayContent={
                                <p className="text-xs text-white font-bold rounded-lg p-1.5  bg-gradient-to-r from-[#767574] to-transparent filter drop-shadow-[0_15px_15px_rgba(118,117,116,0.6)] transform hover:scale-105 transition duration-300">
                                    ARELYS RODRIGUEZ M.
                                </p>
                            }
                        />
                        <TiltedCard
                            imageSrc={Soldado9}
                            altText="BANSHUY CORDOVA GENESIS MISHELL🪖"
                            captionText="BANSHUY CORDOVA GENESIS MISHELL🪖"
                            containerHeight="250px"
                            containerWidth="170px"
                            imageHeight="250px"
                            imageWidth="170px"
                            rotateAmplitude={12}
                            scaleOnHover={1.05}
                            showMobileWarning={false}
                            showTooltip={true}
                            displayOverlayContent={true}
                            overlayContent={
                                <p className="text-xs text-white font-bold rounded-lg p-1.5  bg-gradient-to-r from-[#767574] to-transparent filter drop-shadow-[0_15px_15px_rgba(118,117,116,0.6)] transform hover:scale-105 transition duration-300">
                                    GENESIS BANSHUY C.
                                </p>
                            }
                        />
                        <TiltedCard
                            imageSrc={Soldado10}
                            altText="CRIOLLO TOAPANTA CARLOS DUVIAN🪖"
                            captionText="CRIOLLO TOAPANTA CARLOS DUVIAN🪖"
                            containerHeight="250px"
                            containerWidth="170px"
                            imageHeight="250px"
                            imageWidth="170px"
                            rotateAmplitude={12}
                            scaleOnHover={1.05}
                            showMobileWarning={false}
                            showTooltip={true}
                            displayOverlayContent={true}
                            overlayContent={
                                <p className="text-xs text-white font-bold rounded-lg p-1.5  bg-gradient-to-r from-[#767574] to-transparent filter drop-shadow-[0_15px_15px_rgba(118,117,116,0.6)] transform hover:scale-105 transition duration-300">
                                    CARLOS CRIOLLO T.
                                </p>
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    )
}