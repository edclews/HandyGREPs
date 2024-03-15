// Transpose the selected table
var table = app.selection[0];
if (table.constructor.name != "Table") {
  alert("Please select a table and try again.");
} else {
  // Determine the number of rows and columns in the table
  var numRows = table.rows.length;
  var numColumns = table.columns.length;

  // Create a new table with the transposed dimensions
  var transposedTable = app.documents[0].pages[0].placeholderTextFrames.add();
  transposedTable.geometricBounds = table.geometricBounds;
  transposedTable.insertionPoints[-1].contents = "\t";
  transposedTable.insertTable(numColumns, numRows);

  // Copy the data from the original table to the transposed table
  for (var r = 0; r < numRows; r++) {
    for (var c = 0; c < numColumns; c++) {
      transposedTable.rows[c].cells[r].contents = table.rows[r].cells[c].contents;
    }
  }

  // Delete the original table
  table.remove();
}
