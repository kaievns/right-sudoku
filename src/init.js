[
  'sudoku',
  'sudoku/boards',
  'sudoku/field',
  'sudoku/field/block',
  'sudoku/field/cell',
  'sudoku/field/input',
  'sudoku/menu',
  'sudoku/status'
].each(function(name) {
  document.writeln('<scr'+'ipt type="text/javascript" src="src/'+name+'.js"></scr'+'ipt>');
});