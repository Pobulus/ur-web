const dec2bin = dec => {
 let num = (dec >>> 0).toString(2);
 while (num.length < 4) num = "0" + num;
 return num;
}

const count1s = binStr => binStr.split('').filter(el => el == '1').length;

class UREngine {
  constructor(pieceCount = 7) {
    this.piecesPerPlayer = pieceCount;
    this.reset();
  }
  reset() {
    this.player = 0;
    this.stage = 'preroll'
    const initialPieces = [...Array(this.piecesPerPlayer).keys()];

    this.board = [
      [],[],[],[],[...initialPieces],[],[],[],
      [],[],[],[],[],[],[],[],
      [],[],[],[],[...initialPieces.map(id => id+this.piecesPerPlayer)],[],[],[],
    ];
    this.flower = [
      1,0,0,0,null,null,1,0,
      0,0,0,1,0,0,0,0,
      1,0,0,0,null,null,1,0,
    ]
    this.paths = [
      [4,3,2,1,0,8,9,10,11,12,13,14,15,7,6,5],
      [20,19,18,17,16,8,9,10,11,12,13,14,15,23,22,21],
    ]
    this.dice = '0000';
    this.winner = null;
    this.validMoves = [];
  }
  myPiece(id) { return this.player ? id >= this.piecesPerPlayer : id < this.piecesPerPlayer; }

  
  isInvalid(fieldIndex) {
    if(this.dice === '0000') return 'Cannot move';
    const field = this.board[fieldIndex];
    if(!field.length) return 'Empty field';
    if(!this.myPiece(field[0])) return 'Not your piece';
    const path = this.paths[this.player];
    const targetIndex = path[path.indexOf(fieldIndex) + count1s(this.dice)];
    if(targetIndex == undefined) return 'Target out of bounds';
    const targetField = this.board[targetIndex];
    if(targetField.length){
      if(this.myPiece(targetField[0])){
        if(targetIndex !== path.slice(-1)[0]) return 'You already have a piece there';
      } else {
        if(this.flower[targetIndex]) return 'Enemy on flower';
        
      }
    }
    return false;
  }
  click(fieldIndex) {
    if(this.stage !== 'move') throw new Error(`It is time to ${this.stage}`);

    const invalid = this.isInvalid(fieldIndex);
    if(invalid) throw new Error(invalid);
    const path = this.paths[this.player];
    const targetIndex = path[path.indexOf(fieldIndex) + count1s(this.dice)];
    this.move(fieldIndex, targetIndex);
    // console.log('win condidtion',this.board[path.slice(-1)].length,  this.piecesPerPlayer );
    if(this.board[path.slice(-1)].length === this.piecesPerPlayer) {
      this.winner = this.player;
      this.stage = 'over';
      return;
    }
    if(!this.flower[targetIndex]) this.switchPlayer();
    this.validMoves = [];
    this.stage = 'roll';
  }
  move(from, to) {
    const piece = this.board[from].pop();
    if(this.board[to]?.[0] !== undefined && !this.myPiece(this.board[to]?.[0]) && !this.flower[to]) 
      this.capture(to);
    this.board[to].push(piece);
  }

  capture(field) {
    const piece = this.board[field].pop();
    this.board[this.paths[+!this.player][0]].push(piece);
  }

  switchPlayer() {
    this.player = +!this.player;
  }

  roll() {
    if(this.stage === 'move') throw new Error('You already rolled');
    let res = dec2bin(Math.floor(Math.random() * 16));
    if(this.stage === 'roll') {
      this.stage = 'move';
      this.dice = res;
      const path = this.paths[this.player];
      const validMoves = path.filter(field => !this.isInvalid(field));
      console.log('validMoves',  validMoves);
      if(!validMoves.length) {this.switchPlayer(); this.stage = 'roll';}
      this.validMoves = validMoves;
    } else if(this.stage === 'preroll') {
      console.log('preroll')
      if (this.player) {
          console.log('end of preroll')
          this.stage = 'roll';
          while(count1s(res) == count1s(this.dice)) res = dec2bin(Math.floor(Math.random() * 16));
          if(count1s(res) > count1s(this.dice)) this.switchPlayer();
        } 
      console.log(this.stage);
      this.switchPlayer();
    }
    this.dice = res;
    return res;
  }
  getDice() {
    return this.dice;
  }
  who() {
    return this.player;
  }
  printBoard() {
    const borders = (text, ind) => this.flower[ind] ? `{${text}}` : `[${text}]`;
    for(let y = 0; y < 3; y += 1){
      console.info(this.board.slice(y*8, y*8+8).map((x, ind) => borders(x, ind+y*8)).join(' '));
    }
    console.log(this.dice.split(''), count1s(this.dice), this.stage, this.player);
  }
  getBoard() {
    return JSON.stringify(this.board);
  }
  getObject() {
    const obj = {
      board: this.board,
      dice: this.dice.split(''),
      stage: this.stage,
      player: this.player,
      winner: this.winner,
      validMoves: this.validMoves,
    }
    return JSON.stringify(obj);
  }
};
export default UREngine;