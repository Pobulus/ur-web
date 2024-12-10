function Indicator({ stage, color, win }) {
  const iconMap = {
    roll: "/diceIcon.svg",
    preroll: "/preRollIcon.svg",
    move: "/playerIcon.svg",
    over: "/playerIcon.svg",
  };
  return (
    <div  style={{
       
        padding: '5px',
        minWidth: "50px",
        backgroundColor: "white",
        minHeight: "50px",
        width: "max(8vw, 8vh)",
        height: "max(8vw, 8vh)",
        borderRadius: '25%',
      }}>
      <div
       
      />
      <div
        style={{
          position: "relative",
          
          width: "max(6vw, 6vh)",
          left: '50%',
          top: '0%',
          transform: 'translate(-50%, 20%)',
          height: "max(6vw, 6vh)",
          background: color,
          maskImage: `url(${iconMap[stage]})`,
          maskRepeat: "no-repeat",
          maskSize: "100%",
        }}
      />
      {win && 
      <div
        style={{
          position: "relative",
          
          width: "max(3vw, 3vh)",
          left: '50%',
          top: '0%',
          transform: 'translate(-60%, -105%)',
          height: "max(6vw, 6vh)",
          background: 'darkorange',
          maskImage: `url(crown.svg)`,
          maskRepeat: "no-repeat",
          maskSize: "100%",
        }}
      />}
    </div>
  );
}
export default Indicator;
