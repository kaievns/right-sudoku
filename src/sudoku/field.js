/**
 * Represents the whole numbers field for the game
 *
 * @copyright Nikolay V. Nemshilov aka St. <nemshilov%gmail#com>
 */
Sudoku.Field = new Class({
  initialize: function() {
    this.element = $E('div', {id: 'rs-field'});
    
    this.rows = [];
    this.cols = [];
    this.blocks = [];
    
    for (var i=0; i < 9; i++) {
      var x = i % 3, y = (i/3).floor();
      var block = new Sudoku.Block(x, y);
      block.element.insertTo(this.element);
      this.blocks.push(block);
      
      for (var j=0; j < 9; j++) {
        var cell = block.cells[j];
        
        this.rows[cell.y] = this.rows[cell.y] || [];
        this.cols[cell.x] = this.cols[cell.x] || [];
        
        this.rows[cell.y][cell.x] = this.cols[cell.x][cell.y] = cell;
        
        cell.on('mouseover', this.highlightCross.bind(this, cell.x, cell.y));
      }
    }
    
    this.element.on('mouseout', this.fadeAll.bind(this));
  },
  
  loadPuzzle: function(puzzle) {
    for (var i=0; i < 9; i++) {
      for (var j=0; j < 9; j++) {
        this.rows[i][j].setNumber(puzzle[i][j])
      }
    }
    return this;
  },
  
// pritected
  // highlights the row and colum at the given intersection
  highlightCross: function(x, y) {
    this.fadeAll();
    
    for (var i=0; i < 9; i++) {
      this.rows[y][i].element.addClass('rs-cell-highlighted');
      this.cols[x][i].element.addClass('rs-cell-highlighted');
    }
  },
  
  // fades all the highlights
  fadeAll: function() {
    for (var i=0; i < 9; i++) {
      for (var j=0; j < 9; j++) {
        this.rows[i][j].element.removeClass('rs-cell-highlighted');
      }
    }
  }
});