const Slide = ({ url, isActive, index, total }) => {
  return (
    <div className={isActive ? "slide active" : "slide"}>
      {isActive && <img src={url} alt={`Slide ${index + 1} de ${total}`} />}
    </div>
  );
};

export default Slide;
