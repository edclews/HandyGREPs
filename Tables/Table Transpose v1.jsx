//$.level=0;
//debugger;

// Table Transpose v1.0
// by Iain Anderson
// indesign@funwithstuff.com

// USE ON BACKUP COPIES
// NO RESPONSIBILITY TAKEN FOR ANY DAMAGE CAUSED.

// free to use -- may not be sold
// please report bugs -- I'll try to fix any show-stoppers
// but cell borders are unlikely to be transposed any time soon


with(app){
        
    var myTempContents;
    var myTempFont;
    var myTempSize;
    var myTempStyle;
    var myTemp;
    var myExtraRows = 0;
      
    var myTextFrame = selection[0];
        
    // error catch
    
    var myError = 0;
    
    if (selection.length <= 0) {
        myError = 1;
    }
    else if (selection[0].constructor.name!="TextFrame") {
        myError = 2;
    }
    else if (selection[0].tables.length <= 0) {       
        myError = 3;
    }
    
    // error alerts
    if (myError == 1) {
        // Nothing is selected, so display an error message.
        alert("Nothing is selected. Please select a text frame and try again.")    
    }
    else if (myError == 2) {
        // A non-text frame is selected, so display an error message.
        alert("Please select a single text frame containing a table and try again.")
	}
    else if (myError == 3) {
        // No table in selection, so display an error message.
        alert("No table was found in this text frame. Please select a single text frame containing a table and try again.")
    }     
 
    // go for it!
    else {    
        var myTable = myTextFrame.tables.item(0);     
        var myRows = myTable.bodyRowCount;      
        var myColumns = myTable.columnCount;

        myTable.unmerge();

		// if the table is too tall, make it wider, remember original size
        if (myRows > myColumns) {
            for (var extraCols = myColumns; extraCols < myRows; extraCols++) {
                myTable.columns.add(LocationOptions.atEnd);
            }
            var myOriginalSize = myColumns;
            var myExtraRows = 1;
        }

		// if the table is too wide, make it taller, remember original size
		        else if (myRows < myColumns) {
            for (var extraRows = myRows; extraRows < myColumns; extraRows++) {
                myTable.rows.add(LocationOptions.atEnd);
            }
            var myOriginalSize = myRows;
            var myExtraRows = 2;
        }

        // recheck sizes
        myRows = myTable.bodyRowCount;      
        myColumns = myTable.columnCount;

        // fill blank cells
        for(var myRowCounter = 0; myRowCounter < myRows*myColumns; myRowCounter++){
            if (myTable.cells.item(myRowCounter).contents == "") {
                    myTable.cells.item(myRowCounter).contents = " ";
            }
        }
        
        var mySourceCell, myDestCell;
        
        for(var myRowCounter = 0; myRowCounter < myRows; myRowCounter++){
            for(var myColCounter = myRowCounter+1; myColCounter < myColumns; myColCounter++){

                myCellA = myColCounter+(myRowCounter*myColumns);
                myCellB = myRowCounter+(myColCounter*myColumns);

                // text content            
                myTempContents = myTable.cells.item(myCellA).contents;
                myTable.cells.item(myCellA).contents = myTable.cells.item(myCellB).contents;
                myTable.cells.item(myCellB).contents = myTempContents;

                // text size
                myTempSize = myTable.cells.item(myCellA).paragraphs.item(0).pointSize;
                myTable.cells.item(myCellA).paragraphs.item(0).pointSize = myTable.cells.item(myCellB).paragraphs.item(0).pointSize;
                myTable.cells.item(myCellB).paragraphs.item(0).pointSize = myTempSize;

                // text font and style
                myTempFont = myTable.cells.item(myCellA).paragraphs.item(0).appliedFont;
                myTempStyle = myTable.cells.item(myCellA).paragraphs.item(0).fontStyle;
                
                myTable.cells.item(myCellA).paragraphs.item(0).appliedFont = myTable.cells.item(myCellB).paragraphs.item(0).appliedFont;
                myTable.cells.item(myCellA).paragraphs.item(0).fontStyle = myTable.cells.item(myCellB).paragraphs.item(0).fontStyle;

                myTable.cells.item(myCellB).paragraphs.item(0).appliedFont = myTempFont;
                myTable.cells.item(myCellB).paragraphs.item(0).fontStyle = myTempStyle;


                // text fill colour
                myTempStyle = myTable.cells.item(myCellA).paragraphs.item(0).fillColor;
                myTable.cells.item(myCellA).paragraphs.item(0).fillColor = myTable.cells.item(myCellB).paragraphs.item(0).fillColor;
                myTable.cells.item(myCellB).paragraphs.item(0).fillColor = myTempStyle;

                // cell fill colour
                myTempStyle = myTable.cells.item(myCellA).fillColor;
                myTable.cells.item(myCellA).fillColor = myTable.cells.item(myCellB).fillColor;
                myTable.cells.item(myCellB).fillColor = myTempStyle;

                // cell tint colour
                myTempStyle = myTable.cells.item(myCellA).fillTint;
                myTable.cells.item(myCellA).fillTint = myTable.cells.item(myCellB).fillTint;
                myTable.cells.item(myCellB).fillTint = myTempStyle;



                
            } 
        }        
        
        // shrink rows to original column total
        if (myExtraRows == 1) {
            myTable.bodyRowCount = myOriginalSize;
        }

        // shrink columns to original row total
                else if (myExtraRows == 2) {
            myTable.columnCount = myOriginalSize;
        }
    }
}