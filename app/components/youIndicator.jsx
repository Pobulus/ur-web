function YouIndicator({ name, color }) {
  return (
    <h1
      style={{
        color,
        position: "absolute",
        top: "5%",
        left: "50%",
        width: '100%',
        transform: "translate(-50%, 0%)",
        textAlign: "center",
        filter: "drop-shadow(1px 1px 0px #000)",
      }}
    >
      You are {name}
    </h1>
  );
}
export default YouIndicator;
