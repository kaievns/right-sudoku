/**
 * The field single cell
 *
 * @copyright Nikolay V. Nemshilov aka St. <nemshilov%gmail#com>
 */
Sudoku.Cell = new Class(Observer, {
  initialize: function(block, x, y) {
    this.element = $E('div', {'class': 'rs-cell'}).insertTo(block.element);
    
    this.x = block.x * 3 + x;
    this.y = block.y * 3 + y;
    
    this.block   = block;
    
    this.element.on('mouseover', this.fire.bind(this, 'mouseover'));
  },
  
  setNumber: function(num) {
    this.element.update(''+num);
  }
});