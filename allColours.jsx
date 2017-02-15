app.doScript(main, ScriptLanguage.JAVASCRIPT, [], UndoModes.ENTIRE_SCRIPT, "style cells based on content");

function main() {

var curTable = getTable();
changeTable('\\b[1-4]?\\d%', '0to49');
changeTable('\\b[5]\\d%', '50to59');
changeTable('\\b6\\d%', '60to69');
changeTable('\\b([7-9]\\d|100)%', '70to100');

function getTable() {
if (app.documents.length == 0 || app.selection.length == 0 || /TextFrame|Rectangle/.test(app.selection[0].constructor.name) == true) { 
alert("Warning:\rClick inside a table!");
exit();
}

if (app.selection.length == 1) {
var curSel = app.selection[0];
if (curSel.constructor.name == 'Table') return curSel;
else if (curSel.parent.constructor.name == 'Table') return curSel.parent;
else if(curSel.parent.parent.constructor.name == 'Table') return curSel.parent.parent;
}
else {
alert("Warning:\rSelect a table!");
exit();
}
}

function changeTable(f, s) {
app.findGrepPreferences = app.changeGrepPreferences = null;
app.findGrepPreferences.findWhat = f;
var allFounds = curTable.findGrep();
app.findGrepPreferences = app.changeGrepPreferences = null;

if (allFounds.length > 0) {	
for (var i = 0; i < allFounds.length; i++) {
var curFound = allFounds[i];
var parCell = curFound.parent;
parCell.appliedCellStyle = app.activeDocument.cellStyles.itemByName(s);
parCell.clearCellStyleOverrides(false);
}
}
}
}