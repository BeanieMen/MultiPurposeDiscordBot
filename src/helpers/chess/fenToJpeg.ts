import { createCanvas, CanvasRenderingContext2D, loadImage } from "canvas";

const boardSize = 400;
const squareSize = boardSize / 8;
const pieceSize = squareSize - 10;

async function drawPiece(context: CanvasRenderingContext2D, piece: string, x: number, y: number) {
  context.font = `${pieceSize}px Sans-serif`;
  const img = await loadImage(`./src/images/Chess_${piece.toLowerCase()}${piece.toLowerCase() === piece ? "d" : "l"}t60.png`);
  context.drawImage(img, x - 5, y + pieceSize - 45);
}

async function drawChessboard(context: CanvasRenderingContext2D, fen: string) {
  const fenParts = fen.split(" ");
  const boardState = fenParts[0];
  const pieces = boardState.split("/");

  // Draw the chessboard
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const x = col * squareSize;
      const y = row * squareSize;

      // Alternate colors for squares
      context.fillStyle = (row + col) % 2 === 0 ? "#DDB88C" : "#A0522D";
      context.fillRect(x, y, squareSize, squareSize);
    }
  }

  for (let i = 0; i < pieces.length; i++) {
    let colIndex = 0;
    for (let j = 0; j < pieces[i].length; j++) {
      if (!isNaN(Number(pieces[i][j]))) {
        //if this is a number
        colIndex += Number(pieces[i][j]);
      } else {
        await drawPiece(context, pieces[i][j], colIndex * squareSize, i * squareSize);
        colIndex++;
      }
    }
  }
}

export async function fenToJpeg(fen: string): Promise<Buffer> {
  const canvas = createCanvas(boardSize, boardSize);
  const context = canvas.getContext("2d");
  await drawChessboard(context, fen);
  const buffer = canvas.toBuffer("image/jpeg");
  return buffer;
}
