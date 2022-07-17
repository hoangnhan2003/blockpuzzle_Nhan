/**CONSTANT */
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLOR_MAPPING = [
    'red',
    'orange',
    'green',
    'purple',
    'blue',
    'cyan',
    'yellow',
    'white',
  ];
const COLS_child = 4;
const ROWS_child = 4;
const khai = 7;
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
ctx.canvas.width = COLS*BLOCK_SIZE;
ctx.canvas.height = ROWS*BLOCK_SIZE;
let audio = new Audio('../sound/sounds_clear.wav')
let audio_playing = new Audio('../sound/electro-house-tag-team-13337.mp3');
let audio_end = new Audio('../sound/ChocoboRacingHungryLand-HoaTau-3316639.mp3');
let play = document.getElementById('play');

const BRICK_LAYOUT = [
  [
    [
      [1, 7, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 1],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 1, 7],
      [7, 1, 7],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [7, 1, 7],
      [7, 1, 1],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 1],
      [1, 1, 1],
      [7, 7, 7],
    ],
  ],
  [
    [
      [1, 7, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 1, 1],
      [1, 1, 7],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 7, 7],
      [7, 1, 1],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 7],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 7, 1],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 7],
      [7, 1, 1],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
    ],
    [
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 1, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
  ],
];
const KEY_CODE = {
  LEFT:'ArrowLeft',
  RIGHT:'ArrowRight',
  DOWN:'ArrowDown',
  UP:'ArrowUp'
}
class Board{
    constructor(ctx){
        this.ctx = ctx;
        this.grid = this.generateWhiteBoard();
        this.score = 0;
        this.gameOver = true;
        this.isPlaying = false;
    }
    reset(){
      this.isPlaying = true;
      this.gameOver = false;
      this.score = 0;
      
      for(let row =0;row<this.grid.length;row++){
        for(let col =0;col <this.grid[0].length;col++){
          this.grid = this.generateWhiteBoard();
          this.drawCell(col,row,khai);
        }
      }
    }
    generateWhiteBoard() {
        return Array.from({length: ROWS},() => Array(COLS).fill(khai));
    }
    drawCell(xAxis, yAxis, colorId) {
        // xAxis => 1 yAxis => 1
        this.ctx.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[khai];
        this.ctx.fillRect(xAxis *BLOCK_SIZE,yAxis*BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE);
        this.ctx.fillStyle = 'black';
        this.ctx.strokeRect(xAxis *BLOCK_SIZE,yAxis*BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE);
      }
    drawBoard(){
      for(let row =0;row<this.grid.length;row++){
        for(let col =0;col <this.grid[0].length;col++){
          this.drawCell(col,row,this.grid[row][col]);
        }
      }
    }
    handleCompleteRows(){
      // latestGrid get row not complete
      const latestGrid = board.grid.filter((row)=>{
        return row.some((col) => col === khai)
      });
      
      // newScore get BoardWhile subtract with latestGrid
      const newScore = ROWS - latestGrid.length;
      // NewRows add White row on the top of board and keep stable latestGrid
      const newRows =  Array.from({length: newScore},() => Array(COLS).fill(khai));
      board.grid = [...newRows,...latestGrid];
      this.handleScore(newScore * 10)
      
    }
    handleScore(newScore ){
      this.score += newScore;
      document.getElementById('score').innerHTML = this.score;
      if(newScore!=0){
        audio.play();
        }
      }
    handleGameOver(){
      this.gameOver = true;
      this.isPlaying = false;
      audio_end.play();
      audio_playing.pause();
      this.score = 0;
      play.innerHTML = "Play"
      
      alert("GAME OVER !!!!!");
  }
}
class BoardChild{
  constructor(ctx){

  }
}
class Brick{
  constructor(id){
    this.id = id;
    this.layout = BRICK_LAYOUT[id];
    this.activeIndex = 0;
    this.colPos = 4;
    this.rowPos = -2;
    
  }
  
  draw(){
    for(let row =0;row <this.layout[this.activeIndex].length;row++){
      for(let col =0;col < this.layout[this.activeIndex][0].length;col++){
        if(this.layout[this.activeIndex][row][col]!= khai){
          board.drawCell(col+this.colPos,row+this.rowPos,this.id);
        }
      }
    }
  }
  clear(){
    for(let row =0;row <this.layout[this.activeIndex].length;row++){
      for(let col =0;col < this.layout[this.activeIndex][0].length;col++){
        if(this.layout[this.activeIndex][row][col]!= khai){
          board.drawCell(col+this.colPos,row+this.rowPos,khai);
        }
      }
    }
  }
  moveLeft(){
    if(!this.checkCollision(this.rowPos,this.colPos - 1,this.layout[this.activeIndex])){
      this.clear();
      this.colPos --;
      this.draw();
    }
  }
  moveRight(){
    if(!this.checkCollision(this.rowPos,this.colPos + 1,this.layout[this.activeIndex])){

      this.clear();
      this.colPos ++;
      this.draw();
    }
  }
  moveDown(){
    if(!this.checkCollision(this.rowPos+1,this.colPos,
      this.layout[this.activeIndex]))
    {
      this.clear();
      this.rowPos++ ;
      this.draw();

      return;
    }
    this.handleLanded();
    if(!board.gameOver){

      generateNewBrick();
    }
    
  }
  rotate(){
    if(!this.checkCollision(this.rowPos+1,this.colPos,this.layout[(this.activeIndex+1)%4]))
    {

      this.clear();
      this.activeIndex = (this.activeIndex + 1) % 4; // active index from 1 to 3
      this.draw();
    }
  }
  checkCollision(nextROw,nextCol,nextLayout){
   
    for(let row =0;row < nextLayout.length;row++){
      for(let col =0 ;col <this.layout[this.activeIndex][0].length;col++){
        if(nextLayout[row][col] != khai && nextROw >=0){
          if(
            col+nextCol <0||
            col + nextCol >= COLS || 
            (row+nextROw) >= ROWS ||
            board.grid[row+nextROw][col+nextCol]!= khai
            ) 
            
            return true;
        }
      }
    }
  }
  handleLanded(){
    if(this.rowPos<=0){
      board.handleGameOver();
    }
    for(let row =0;row<this.layout[this.activeIndex].length;row++){
      for(let col =0;col<this.layout[this.activeIndex][0].length;col++){
        if(this.layout[this.activeIndex][row][col] != khai){
          board.grid[row+this.rowPos][col + this.colPos] = this.id;
        }
      }
    }
    board.handleCompleteRows();
    board.drawBoard();
    
  }
  autoMoveDown(){

  }
  
}
let board = new Board(ctx);
function generateNewBrick(){
    brick = new Brick(Math.floor(Math.random()* BRICK_LAYOUT.length))
}
board.drawBoard();
generateNewBrick();
function playGame(){
  
  const refresh = setInterval(()=>{
    if(!board.gameOver && board.isPlaying){
        brick.moveDown();
       audio_playing.play();
       audio_end.pause();
       audio_playing.ontimeupdate = function(){
         if(audio_playing.currentTime == audio_playing.duration){
          audio_playing.play()
         }
        }
        
      }
      else{
        audio_playing.pause();
        clearInterval(refresh);
      }
  },1000);
  if(!board.isPlaying){
    
    if(board.gameOver){
      board.reset();
      play.innerHTML = board.score;
      board.gameOver = false;
      board.isPlaying =true;
      play.innerHTML= 'Pause'
      generateNewBrick();
    }
    else{
      
      board.isPlaying =true;
      play.innerHTML= 'Pause'
    }
  }
else{
  board.isPlaying = false;
  play.innerHTML = 'Play'
}
 
}



document.addEventListener('keydown',(e)=>{
  if(!board.gameOver && board.isPlaying){
  switch(e.code){
      case KEY_CODE.LEFT:
        brick.moveLeft();
        break;
      case KEY_CODE.RIGHT:
        brick.moveRight();
        break;
      case KEY_CODE.DOWN:
        brick.moveDown();
        break;
      case KEY_CODE.UP:
        brick.rotate();
        break;
      default:
        break;
    }
  }
})

