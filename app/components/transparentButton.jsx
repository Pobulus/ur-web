function TransparentButton({children, onClick}) {
   return <button
    onClick={onClick}
    // onClick={() => console.log(contrastingColor(playerColors[0]))}
    style={{
      background: "transparent",
      border: "none",
      cursor: 'pointer'
    //   fontSize: 0,
    }}
  >
    {children}
  </button>
}
export default TransparentButton;
