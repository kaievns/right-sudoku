/**
 * RightJS based Sudoku game
 *
 * @copyright Nikolay V. Nemshilov aka St. <nemshilov%gmail#com>
 */
var Sudoku = new Class({
  initialize: function(element) {
    this.container = $E('div', {id: 'r-sudoku'}).insertTo($(element));
    
    this.field = new Sudoku.Field();
    this.menu  = new Sudoku.Menu();
    
    this.container.insert([
      this.field.element,
      this.menu.element,
      
      $E('div', {style: {clear: 'both'}})
    ]);
    
    this.menu.on('level-changed', this.loadLevel.bind(this));
    this.menu.on('reset', this.reset.bind(this));
    
    this.reset();
  },
  
  reset: function() {
    this.loadLevel(this.menu.currentLevel());
  },
  
  loadLevel: function(level) {
    var board = Sudoku.Boards.random(level);
    
    this.field.loadPuzzle(board.puzzle);
  }
})