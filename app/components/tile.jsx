function Tile({ type, children }) {
  return (
    <div
      style={{
        minWidth: "50px",
        minHeight: "50px",
        width: "max(8vw, 8vh)",
        height: "max(8vw, 8vh)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "max(8vw, 8vh)",
          height: "max(8vw, 8vh)",
          borderRadius: "25%",
          background: type != null ? "white" : "transparent",
          maskImage: type ? "url(/flower.svg)" : "",
          maskRepeat: "no-repeat",
          maskSize: "100%",
        }}
      />
      {children}
    </div>
  );
}
export default Tile;
