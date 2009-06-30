/**
 * Sudoku field 3x3 block
 *
 * @copyright Nikolay V. Nemshilov aka St. <nemshilov%gmail#com>
 */
Sudoku.Field.Block = new Class({
  initialize: function(x, y) {
    this.element = $E('div', {'class': 'rs-block'});
    
    this.x = x;
    this.y = y;
    
    this.cells = [];
    
    for (var i=0; i < 9; i++) {
      var cell = new Sudoku.Field.Cell(this, i % 3, (i / 3).floor());
      this.cells.push(cell);
    }
  }
});