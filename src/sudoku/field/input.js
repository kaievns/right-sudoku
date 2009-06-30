/**
 * represents the input options unit which appears
 * when you click on a cell and let you enter a number
 *
 * @copyright Nikolay V. Nemshilov aka St.
 */
Sudoku.Field.Input = new Class(Observer, {
  initialize: function() {
    this.element = $E('div', {'class': 'rs-input', 'style': {display: 'none'}});
    for (var i=1; i < 10; i++) {
      $E('div', {html: ''+i}).insertTo(this.element).on('click', this.select.bind(this, i));
    }
    
    document.on('click', this.hide.bind(this));
  },
  
  showAt: function(cell) {
    this.element.show('fade', {duration: 'short'});
    var cell_size = cell.element.offsetWidth;
    
    this.element.setStyle({
      marginLeft: (cell.x * cell_size - this.element.offsetWidth/3) + 'px',
      marginTop: (cell.y * cell_size - this.element.offsetHeight/3) + 'px'
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
})