/**
 * the field changes history
 *
 * @copyright Nikolay V. Nemshilov aka St.
 */
Sudoku.Field.History = new Class({
  initialize: function() {
    this.stack = [];
  },
  
  push: function(cell) {
    this.stack.push(cell);
  },
  
  undo: function() {
    var cell = this.stack.pop();
    
    if (cell) {
      cell.reset();
    }
  }
});