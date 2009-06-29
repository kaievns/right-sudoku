[
  'sudoku',
  'sudoku/field',
  'sudoku/block',
  'sudoku/cell'
].each(function(name) {
  document.writeln('<scr'+'ipt type="text/javascript" src="src/'+name+'.js"></scr'+'ipt>');
});