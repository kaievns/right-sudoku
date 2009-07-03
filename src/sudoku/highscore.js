/**
 * Represents the highscore list
 *
 * @copyright Nikolay V. Nemshilov aka St.
 */
Sudoku.Highscore = new Class({
  LENGTH: 7,
  
  initialize: function() {
    this.element = $E('div', {
      id: 'rs-highscore',
      html: '<label>Highscore</label><ul id="rs-highscore-list"></ul></label>'
    });
    
    this.list = this.element.first("#rs-highscore-list");
    
    this.read();
  },
  
  load: function(level) {
    this.levels[level] = this.levels[level] || [];
    this.results = this.levels[level];
    
    this.render();
    
    return this;
  },
  
  add: function(time) {
    this.results.push({time: time, name: '<input type="text" />'});
    this.results.sort(function(a,b) { return a.time > b.time ? 1 : a.time < b.time ? -1 : 0; });
    this.results.splice(this.LENGTH, this.results.length);
    
    return this.render();
  },
  
// protected

  // reads the saved results out of the cookies
  read: function() {
    var levels = Cookie.get('rs-result') || '';
    
    this.levels = {};
    
    levels.split('%').each(function(level) {
      var els = level.split('#');
      if (els.length == 2) {
        this.levels[els.first()] = els.last().split(';').map(function(result) {
          var els = result.split('|');
          return els.length == 2 ? {
            time: els.first().toInt(),
            name: unescape(els.last())
          } : null;
        }).compact();
      }
    }, this);
    
    return this;
  },

  render: function() {
    this.list.update(
      this.results.map(function(result) {
        var minutes = (result.time/60).floor();
        var seconds = result.time % 60;
        
        minutes = (minutes < 10 ? '0' : '') + minutes;
        seconds = (seconds < 10 ? '0' : '') + seconds;
        
        return '<li>'+minutes+':'+seconds+' '+result.name+'</li>';
      }).join('') || 'Empty'
    );
    
    var input = this.list.first('input');
    if (input) {
      input.value = this.lastName || '';
      input.on('keydown', (function(event) {
        if (event.keyCode == 13) { // <- the enter is pressed
          event.stop();
          this.acceptName(input.value);
        }
      }).bind(this)).focus();
    }
    
    return this;
  },
  
  acceptName: function(name) {
    var result = this.results.any(function(result) { return result.name == '<input type="text" />'; });
    if (result) {
      this.lastName = name;
      result.name = name.replace('<', '&lt;').replace('>', '&gt;');
    }
    return this.render().save();
  },
  
  // saves the current results to the cookies
  save: function() {
    Cookie.set('rs-result',
      Object.keys(this.levels).map(function(level) {
        return level+"#"+this.levels[level].map(function(result) {
          return result.time+"|"+escape(result.name)
        }).join(';')
      }, this).join('%'),
      {duration: 999}
    );
    
    return this;
  }
  
});