/**
 * RightJS based Sudoku game
 *
 * @copyright Nikolay V. Nemshilov aka St. <nemshilov%gmail#com>
 */
var Sudoku = new Class({
  initialize: function(element) {
    this.container = $E('div', {id: 'rs-game'}).insertTo($(element));
    
    this.field     = new Sudoku.Field();
    this.menu      = new Sudoku.Menu();
    this.status    = new Sudoku.Status();
    this.highscore = new Sudoku.Highscore();
    
    this.container.insert([
      this.field.element,
      
      $E('div', {id: 'rs-sidebar'}).insert([
        this.menu.element,
        this.status.element,
        this.highscore.element
      ]),
      
      $E('div', {style: {clear: 'both'}})
    ]);
    
    this.menu.on('level-changed', this.loadLevel.bind(this));
    this.menu.on('reset', this.reset.bind(this));
    this.menu.on('undo', this.field.undo.bind(this.field));
    
    this.field.on('finished', this.finished.bind(this));
    
    this.reset();
  },
  
  reset: function() {
    this.loadLevel(this.menu.currentLevel());
    this.status.resetTimer();
  },
  
  loadLevel: function(level) {
    var board = Sudoku.Boards.random(level);
    
    this.status.setDifficulty(board.difficulty);
    this.highscore.load(level);
    
    this.field.loadPuzzle(board.puzzle);
  },
  
  finished: function() {
    this.status.stopTimer();
    this.field.showFinishAnimation();
    this.highscore.add(this.status.getTime());
  }
});