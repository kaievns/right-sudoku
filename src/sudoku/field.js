/**
 * Represents the whole numbers field for the game
 *
 * @copyright Nikolay V. Nemshilov aka St. <nemshilov%gmail#com>
 */
Sudoku.Field = new Class(Observer, {
  initialize: function() {
    this.element = $E('div', {id: 'rs-field'});
    
    this.initCells();
    
    this.input = new Sudoku.Field.Input();
    this.element.insert(this.input.element);
  },
  
  loadPuzzle: function(puzzle) {
    for (var i=0; i < 9; i++) {
      for (var j=0; j < 9; j++) {
        this.rows[i][j].setNumber(puzzle[i][j], true);
      }
    }
    return this;
  },
  
  showInput: function(cell) {
    if (!cell.isPreset())
      this.input.showAt(cell);
  },
  
// pritected
  
  // builds the cells structure
  initCells: function() {
    this.rows = [];
    this.cols = [];
    this.blocks = [];
    
    for (var i=0; i < 9; i++) {
      var x = i % 3, y = (i/3).floor();
      var block = new Sudoku.Field.Block(x, y);
      block.element.insertTo(this.element);
      this.blocks.push(block);
      
      for (var j=0; j < 9; j++) {
        var cell = block.cells[j];
        
        this.rows[cell.y] = this.rows[cell.y] || [];
        this.cols[cell.x] = this.cols[cell.x] || [];
        
        this.rows[cell.y][cell.x] = this.cols[cell.x][cell.y] = cell;
        
        cell.on('mouseover', this.highlightCross.bind(this, cell));
        cell.on('select', this.showInput.bind(this, cell));
        cell.on('assign', this.cellChanged.bind(this, cell));
      }
    }
    
    this.element.on('mouseout', this.fadeAll.bind(this));
  },

  // highlights the row and colum at the given intersection
  highlightCross: function(cell) {
    this.fadeAll();
    
    for (var i=0; i < 9; i++) {
      this.rows[cell.y][i].element.addClass('rs-cell-highlighted');
      this.cols[cell.x][i].element.addClass('rs-cell-highlighted');
    }
  },
  
  // fades all the highlights
  fadeAll: function() {
    for (var i=0; i < 9; i++) {
      for (var j=0; j < 9; j++) {
        this.rows[i][j].element.removeClass('rs-cell-highlighted');
      }
    }
  },
  
  cellChanged: function(cell) {
    this.checkFieldValues();
  },
  
  checkFieldValues: function() {
    var fine = true, fully_filled = true;
    
    for (var i=0; i < 9; i++) {
      for (var j=0; j < 9; j++) {
        var cell = this.cols[i][j];
        if (cell.number) {
          fine = fine & this.checkCellValue(cell);
        } else {
          fully_filled = false;
        }
      }
    }
    
    if (!fine)            this.fire('error');
    else if(fully_filled) this.fire('finished');
  },
  
  // checks the constrains after a cell value was changed
  checkCellValue: function(cell) {
    var row = this.rows[cell.y];
    var col = this.cols[cell.x];
    var box = '012345678'.split('').map('toInt').map(function(i) {
      var x = (cell.x/3).floor() * 3 + i % 3;
      var y = (cell.y/3).floor() * 3 + (i/3).floor();
      
      return this.cols[x][y];
    }, this);
    
    var fine = true;
    
    [row, col, box].each(function(list) {
      var numbers = list.map('number').compact();
      var uniq_numbers = numbers.uniq();
      if (numbers.length != uniq_numbers.length) {
        for (var i=0; i < numbers.length; i++) {
          if (numbers[i] != uniq_numbers[i]) {
            if (numbers[i] == cell.number) {
              fine = fine & false;
            }
            break;
          }
        }
      }
    }, this);
    
    cell.element[fine ? 'removeClass' : 'addClass']('rs-cell-wrong');
    
    return fine;
  }
});