/**
 * Represents the menu with options and buttons for the game
 *
 * @copyright Nikolay V. Nemshilov aka St.
 */
Sudoku.Menu = new Class(Observer, {
  LEVELS: ['Easy', 'Normal', 'Hard', 'Extreme'],
  DEFAULT: 'normal',
  
  initialize: function() {
    this.element = $E('div', {id: 'rs-menu'});
    
    // the levels options
    this.levels = $E('select', {id: 'rs-levels'}).insertTo(this.element).update(
      this.LEVELS.map(function(label) {
        return $E('option', {value: label.toLowerCase(), html: "Level: "+label});
      })).setValue(Cookie.get('rs-level') || this.DEFAULT
      
      ).on('change', (function() {
        this.fire('level-changed', this.levels.value);
        Cookie.set('rs-level', this.levels.value);
      }).bind(this));
    
    // the reset button
    this.reset = $E('input', {id: 'rs-reset', type: 'button', value: 'Reset'}).insertTo(this.element
      ).on('click', this.fire.bind(this, 'reset'));
    
    // the undo button
    this.undo = $E('input', {id: 'rs-undo', type: 'button', value: 'Undo'}).insertTo(this.element
      ).on('click', this.fire.bind(this, 'undo'));
  },
  
  currentLevel: function() {
    return this.levels.value;
  }
  
});