
function Piece({color, count}) {
    const colorInternal = color ?? '#0000aa';
    return (

    <>
      <div id="piece" className="prevent-select">
        <div className="square" id="bottom" style={{backgroundColor: `${colorInternal}`}}></div>
        <div className="square" id="top" style={{backgroundColor: `${colorInternal}`}}></div>
        {count > 1 && <h1 id="pieceCount">{count}</h1>}
      </div>
    </>
    );
}

export default Piece;