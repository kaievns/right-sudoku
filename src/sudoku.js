/**
 * RightJS based Sudoku game
 *
 * @copyright Nikolay V. Nemshilov aka St. <nemshilov%gmail#com>
 */
var Sudoku = new Class({
  initialize: function(element) {
    this.container = $E('div', {id: 'r-sudoku'}).insertTo($(element));
    
    this.field = new Sudoku.Field();
    this.container.insert(this.field.element);
  }
})