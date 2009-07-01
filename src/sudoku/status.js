/**
 * Represents the current status display block
 *
 * @copyright Nikolay V. Nemshilov aka St.
 */
Sudoku.Status = new Class({
  initialize: function() {
    this.element = $E('div', {
      id: 'rs-status',
      html: '<div><label>Difficulty:</label> <span id="rs-difficulty"></span></div>'+
        '<div><label>Time:</label> <span id="rs-timer"></span></div>'
    });
    
    this.difficulty = this.element.first('#rs-difficulty');
    this.timeEl     = this.element.first('#rs-timer');
  },
  
  setDifficulty: function(value) {
    this.difficulty.update((''+(value * 10)).substr(0,3));
  },
  
  resetTimer: function() {
    if (this.timer) this.timer.stop();
    
    this.startTime = new Date();
    this.timer = this.updateTimer.bind(this).periodical(1000);
    this.updateTimer();
  },
  
  stopTimer: function() {
    this.timer.stop();
  },
  
  getTime: function() {
    return this.seconds || 0;
  },
  
// protected
  
  updateTimer: function() {
    this.seconds = ((new Date() - this.startTime)/1000).round();
    
    var minutes = (this.seconds / 60).floor();
    var seconds = this.seconds % 60;
    
    minutes = (minutes < 10 ? '0' : '') + minutes;
    seconds = (seconds < 10 ? '0' : '') + seconds;
    
    this.timeEl.update(minutes+':'+seconds);
  }
  
  
});