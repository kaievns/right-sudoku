/**
 * the field changes history
 *
 * @copyright Nikolay V. Nemshilov aka St.
 */
Sudoku.Field.History = new Class(Array, {
  undo: function() {
    var cell = this.pop();
    
    if (cell) {
      cell.reset();
    }
  }
});