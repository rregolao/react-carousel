const Indicators = ({ activeIndex, length, onSelect }) => {
  return (
    <div className="indicators">
      {Array.from({ length }, (_, index) => (
        <button
          key={index}
          type="button"
          className={index === activeIndex ? "indicator active" : "indicator"}
          onClick={() => onSelect(index)}
          aria-label={`Ir para o slide ${index + 1} de ${length}`}
          aria-current={index === activeIndex}
        />
      ))}
    </div>
  );
};

export default Indicators;
