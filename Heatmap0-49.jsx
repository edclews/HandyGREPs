var curDoc = app.documents[0];
// all tables in the current document
var allTables = curDoc.stories.everyItem().tables.everyItem(); 

app.findGrepPreferences = app.changeGrepPreferences = null;
app.findGrepPreferences.findWhat = "\\b[1-4]?\\d%";

var allFounds = allTables.findGrep();
app.findGrepPreferences = app.changeGrepPreferences = null;

for ( var i = 0; i < allFounds.length; i++ ) {
var tableFound = allFounds[i];
if ( tableFound.length > 0 ) {
for ( var j = 0; j < tableFound.length; j++ ) {
var curFound = tableFound[j];
// the complete row of the reference >> only the parent cell > curFound.parent
var cellsInRow = curFound.parent.cells.everyItem(); 
// apply a cellStyle
cellsInRow.appliedCellStyle = curDoc.cellStyles.itemByName("0to49");
cellsInRow.clearCellStyleOverrides(false);
} // end for
} // end if
} // end for