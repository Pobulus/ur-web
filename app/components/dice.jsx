
function Dice({values, highlight, blocked}) {
    const hihglightColor = blocked ? '#ff8844' :'#88ff44';
    const bg = highlight ? hihglightColor : 'white';
    return <div style={{ 
        display:'flex', 
        flexDirection:'row',
        padding: '1vh',
        borderRadius: '2vh',
        backgroundColor: bg,
        position: 'absolute',
        right: '5%',
        bottom: '5%'
    }}>
    {values?.map((val, index) => <div key={index} style={{width:'7vh', height: '7vh', backgroundColor: val == '1' ? 'black' : bg, margin: '1%', borderRadius: '25%' }} />)}
    </div>
}

export default Dice;
