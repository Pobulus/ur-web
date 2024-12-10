import Piece from "./piece";
import Tile from "./tile";

function Board({
  onTileClick,
  structure,
  pieces,
  colors,
  valid,
  blocked,
  transposed,
}) {
  const transpose = (matrix) =>
    matrix[0].map((_, colIndex) => matrix?.map((row) => row[colIndex]));

  const getColor = (id) => colors[+(id >= 7)];
  const hihglightColor = blocked ? "#ff8844" : "#88ff44";
  const internalStructure = transposed ? transpose(structure) : structure;
  return (
    <table>
      <tbody>
        {internalStructure.map((row, rowInd) => (
          <tr key={rowInd}>
            {row.map((tile, tileInd) => {
              const index = transposed
                ? tileInd * internalStructure.length + rowInd
                : tileInd + row.length * rowInd;
              return (
                <td key={tileInd} onClick={() => onTileClick(index)}>
                  <Tile type={tile}>
                    {pieces?.[index]?.length > 0 && (
                      <Piece
                        color={
                          valid.includes(index)
                            ? hihglightColor
                            : getColor(pieces[index][0])
                        }
                        count={pieces?.[index]?.length}
                      />
                    )}
                  </Tile>
                </td>
              );
            })}
          </tr>
        ))}
        <tr></tr>
      </tbody>
    </table>
  );
}
export default Board;
