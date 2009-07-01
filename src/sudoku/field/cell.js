/**
 * The field single cell
 *
 * @copyright Nikolay V. Nemshilov aka St. <nemshilov%gmail#com>
 */
Sudoku.Field.Cell = new Class(Observer, {
  initialize: function(block, x, y) {
    this.element = $E('div', {'class': 'rs-cell'}).insertTo(block.element);
    
    this.x = block.x * 3 + x;
    this.y = block.y * 3 + y;
    
    this.block   = block;
    
    this.element.on('mouseover', this.fire.bind(this, 'mouseover'));
    this.element.on('click', (function(event) { event.stop(); this.fire('select')}).bind(this));
  },
  
  setNumber: function(num, preset) {
    this.element.update(num == null ? '' : ''+num)[num == null ? 'removeClass' : 'addClass'](preset ? 'rs-cell-preset' : 'rc-cell-assigned');
    
    this.number = num;
    
    if (!preset) {
      this.fire('assign');
    }
    
    return this;
  },
  
  reset: function() {
    return this.setNumber(null);
  },
  
  isPreset: function() {
    return this.element.hasClass('rs-cell-preset');
  }
});