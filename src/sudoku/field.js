/**
 * Represents the whole numbers field for the game
 *
 * @copyright Nikolay V. Nemshilov aka St. <nemshilov%gmail#com>
 */
Sudoku.Field = new Class(Observer, {
  initialize: function() {
    this.element = $E('div', {id: 'rs-field'});
    
    this.input = new Sudoku.Field.Input();
    this.element.insert(this.input.element);
    
    this.history = new Sudoku.Field.History();
    
    this.initCells();
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
    
    return this;
  },
  
  undo: function() {
    this.history.undo();
    return this;
  },
  
  showFinishAnimation: function() {
    this.element.highlight('pink').highlight('pink').highlight('pink');
    
    return this;
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
    
    this.element.on('mouseout', this.fadeCross.bind(this));
  },

  // highlights the row and colum at the given intersection
  highlightCross: function(cell) {
    this.fadeCross();
    
    for (var i=0; i < 9; i++) {
      this.rows[cell.y][i].element.style.background = this.cols[cell.x][i].element.style.background = '#FEF';
    }
    
    this.prevCell = cell;
  },
  
  // fades all the highlights
  fadeCross: function() {
    if (this.prevCell) {
      for (var i=0; i < 9; i++) {
        this.rows[this.prevCell.y][i].element.style.background = this.cols[this.prevCell.x][i].element.style.background = 'transparent';
      }
    }
  },
  
  cellChanged: function(cell) {
    if (cell.number)
      this.history.push(cell);
      
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
          cell.element.removeClass('rs-cell-wrong');
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
    var box = [0,1,2,3,4,5,6,7,8].map(function(i) {
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