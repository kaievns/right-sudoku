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
    
    this.shuffle();
  },
  
  /**
   * shuffles the field and creates new board
   *
   * @return Field self
   */
  shuffle: function() {
    var grid = this.generateGrid();
    
    grid.each(function(row, i) {
      row.each(function(num, j) {
        this.rows[i][j].setNumber(num);
      }, this);
    }, this);
    
    return this.mask();
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
  },

  // generates randomly distributed field
  generateGrid: function() {
    var numbers = '123456789'.split('').map('toInt');
    var matrix  = numbers.map(function() { return []; });
    
    for (var x=0; x < 9; x++) {
      var options = [];
      
      for (var y=0; y < 9; y++) {
        var col_numbers = numbers.map(function(i) { return matrix[i-1][y]; });
        var box_numbers = numbers.map(function(i) {
          var box_x = (x/3).floor() * 3 + ((i-1) % 3);
          var box_y = (y/3).floor() * 3 + ((i-1)/3).floor();
          
          return matrix[box_x][box_y];
        });
        
        options.push(numbers.without.apply(numbers, col_numbers.concat(box_numbers)));
      }
      
      matrix[x] = this.sequenceFromOptions(options);
      
      // drop and start over if there sequence was damaged
      if (matrix[x].compact().length < 9)
        return this.generateGrid();
    }
    
    return matrix;
  },
  
  sequenceFromOptions: function(options) {
    for (var i=0; i < 9; i++) {
      this.cleanOptions(options);
      
      options[i] = [options[i].random()];
      for (var j=i+1; j < 9; j++) {
        options[j] = options[j].without(options[i][0]);
      }
    }
    
    return options.map('first');
  },
  
  cleanOptions: function(options) {
    for (var i=0; i < 9; i++) {
      if (options[i].length == 1) {
        for (var j=0; j < 9; j++) {
          options[j] = options[j].length == 1 ? options[j] : options[j].without(options[i][0]);
        }
      }
    }
  },
  
  // generates the field masking constrains
  mask: function() {
    
    return this;
  }
});