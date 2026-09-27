import { useState, useEffect, useRef, useCallback } from "react";
import Slide from "./Slide";
import Indicators from "./Indicators";

const INTERVALO_MS = 5000;

const Carousel = ({ imageUrls }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pausado, setPausado] = useState(false);
  const intervalRef = useRef(null);

  // Reinicia o temporizador do zero (sempre com o intervalo completo),
  // usado tanto pelo avanço automático quanto por qualquer navegação manual
  // (clique em Anterior/Próximo, indicador ou teclado). Como o timer nunca
  // fica "preso" esperando um estado antigo (como a antiga flag
  // manualChange), a navegação manual sempre reinicia o ciclo em exatos
  // 5s, em vez de acumular um atraso extra.
  const reiniciarTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (pausado) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, INTERVALO_MS);
  }, [imageUrls.length, pausado]);

  useEffect(() => {
    reiniciarTimer();
    return () => clearInterval(intervalRef.current);
  }, [reiniciarTimer]);

  const irPara = (index) => {
    setActiveIndex(index);
    reiniciarTimer();
  };

  const goPrev = () => {
    irPara((activeIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  const goNext = () => {
    irPara((activeIndex + 1) % imageUrls.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  };

  return (
    <div
      className="carousel"
      tabIndex={0}
      role="region"
      aria-label="Carrossel de imagens"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      {imageUrls.map((url, index) => (
        <Slide
          url={url}
          key={index}
          index={index}
          total={imageUrls.length}
          isActive={index === activeIndex}
        />
      ))}
      <Indicators
        activeIndex={activeIndex}
        length={imageUrls.length}
        onSelect={irPara}
      />
      <button className="carousel-button prev" onClick={goPrev}>
        Anterior
      </button>
      <button className="carousel-button next" onClick={goNext}>
        Próximo
      </button>
    </div>
  );
};

export default Carousel;
