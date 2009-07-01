/**
 * represents the input options unit which appears
 * when you click on a cell and let you enter a number
 *
 * @copyright Nikolay V. Nemshilov aka St.
 */
Sudoku.Field.Input = new Class(Observer, {
  initialize: function() {
    this.element = $E('div', {'class': 'rs-input', 'style': {display: 'none'}});
    this.element.insert($E('div', {'class': 'rs-input-shadow'}));
    
    for (var i=1; i < 10; i++) {
      $E('div', {html: ''+i}).insertTo(this.element).on('click', this.select.bind(this, i));
    }
    
    document.on('click', this.hide.bind(this));
  },
  
  showAt: function(cell) {
    this.element.show('fade', {duration: 'short'});
    var cell_position = cell.element.position();
    
    this.element.setStyle({
      left: (cell_position.x - this.element.offsetWidth/3 + 4) + 'px',
      top: (cell_position.y - this.element.offsetHeight/3 + 4) + 'px'
    });
    
    this.currentCell = cell;
    
    return this;
  },
  
  hide: function() {
    this.element.hide();
    return this;
  },
  
  select: function(number) {
    if (this.currentCell) {
      this.currentCell.setNumber(number);
    }
  }
});