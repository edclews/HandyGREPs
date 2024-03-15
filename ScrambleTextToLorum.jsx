    if (app.selection.length != 1 || app.selection[0].constructor.name != "TextFrame")  
    {  
     alert ("Ground. Pull up. Ground. Pull up."); exit(0);  
    }  
    // Save selection  
    targetStory = app.selection[0].parentStory.texts[0];  
    // Make a Lorem frame  
    loremFrame = app.activeDocument.textFrames.add();  
    loremFrame.geometricBounds = [ "0mm","0mm", "200mm", "200mm" ];  
    loremFrame.insertionPoints[0].appliedFont = "Times New Roman";  
    loremFrame.insertionPoints[0].pointSize = 8;  
    loremFrame.contents = TextFrameContents.PLACEHOLDER_TEXT;  
    sourceStory = loremFrame.texts[0];  
    // Grab its words  
    sourceWords = sourceStory.words.everyItem().contents;  
    // .. and kill the placeholder  
    loremFrame.remove(0);  
    // Replace one word at a time. Start at the end.  
    sourceWord = 0;  
    destWord = 0;  
    while (destWord < targetStory.words.length)  
    {  
     targetStory.words[destWord].contents = sourceWords[sourceWord];  
     destWord++;  
     sourceWord++;  
     if (sourceWord >= sourceWords.length)  
      sourceWord = 0;  
    }  
    alert ("Safe landing. Have a nice day.");  