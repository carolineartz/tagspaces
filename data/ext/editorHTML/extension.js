define(function(require, exports, module) {
"use strict";

exports.config = {
    "id": "editorHTML", // ID should be equal to the directory name where the ext. is located   
    "title": "HTML Editor",
    "type": "editor", // viewer, ts for tagspace
    "supportedFileTypes": [
        "htm", "html", "*"
     ]        
}

var htmlEditor = undefined;

exports.init1 = function(filePath, containerElementID) {
    console.debug("Initalization HTML Text Editor...");
	require([
		'./wysihtml5/advanced',
	 	'./wysihtml5/wysihtml5-0.4.0pre.min',
	 	'css!ext/editorHTML/wysihtml5/stylesheet'
	 	], function() {
		generateUI(containerElementID);
		htmlEditor = new wysihtml5.Editor("htmlEditor", {
			toolbar : "toolbar",
			parserRules : wysihtml5ParserRules
		});
		IOAPI.loadTextFile(filePath);
	});
}

exports.init2 = function(filePath, containerElementID) {
    console.debug("Initalization HTML Text Editor...");
	require([
		'./jwysiwyg/jquery.wysiwyg',
	 	'css!./jwysiwyg/jquery.wysiwyg'
	 	], function() {
		$("#"+containerElementID).append('<textarea id="htmlEditor" style="border-width: 0px; width: 100%; height: 100%"></textarea>');	 		
		$('#htmlEditor').wysiwyg();
		IOAPI.loadTextFile(filePath);
	});
}

exports.init = function(filePath, containerElementID) {
    console.debug("Initalization HTML Text Editor...");
	require([
		'./cleditor/jquery.cleditor.min',
	 	'css!./cleditor/jquery.cleditor'
	 	], function() {
		$("#"+containerElementID).append('<textarea id="htmlEditor" style="border-width: 0px; width: 100%; height: 100%"></textarea>');	 		
		$.cleditor.defaultOptions.width = '100%';
		$.cleditor.defaultOptions.height = '100%';
		IOAPI.loadTextFile(filePath);
	});
}

exports.setFileType = function(fileType) {
    console.debug("setFileType not supported on this extension");      
}

exports.viewerMode = function(isViewerMode) {
    // set readonly      
}

exports.setContent = function(content) {
//    htmlEditor.setValue(content);
//	$("#htmlEditor").wysiwyg("setContent", content);    

	$('#htmlEditor').val(content);
	$('#htmlEditor').cleditor();
	//$('#htmlEditor').html(content);
	//$('#htmlEditor').cleditor().updateFrame()
}

exports.getContent = function() {
//    return htmlEditor.getValue();
	return $('#htmlEditor').val();
}

var generateUI = function(containerElementID) {
	$("#"+containerElementID).append(''+
	  '<div id="toolbar" >'+
	    '<a data-wysihtml5-command="bold" title="CTRL+B">bold</a> |'+
	    '<a data-wysihtml5-command="italic" title="CTRL+I">italic</a> |'+
	    '<a data-wysihtml5-command="createLink">insert link</a> |'+
	    '<a data-wysihtml5-command="insertImage">insert image</a> |'+
	    '<a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h1">h1</a> |'+
	    '<a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h2">h2</a> |'+
	    '<a data-wysihtml5-command="insertUnorderedList">insertUnorderedList</a> |'+
	    '<a data-wysihtml5-command="insertOrderedList">insertOrderedList</a> |'+
	    '<a data-wysihtml5-command="foreColor" data-wysihtml5-command-value="red">red</a> |'+
	    '<a data-wysihtml5-command="foreColor" data-wysihtml5-command-value="green">green</a> |'+
	    '<a data-wysihtml5-command="foreColor" data-wysihtml5-command-value="blue">blue</a> |'+
	    '<a data-wysihtml5-command="undo">undo</a> |'+
	    '<a data-wysihtml5-command="redo">redo</a> |'+
	    '<a data-wysihtml5-command="insertSpeech">speech</a>'+
	    '<a data-wysihtml5-action="change_view">switch to html view</a>'+ 
	    '<div data-wysihtml5-dialog="createLink" style="display: none;">'+
	      '<label>Link:<input data-wysihtml5-dialog-field="href" value="http://"></label>'+
	      '<a data-wysihtml5-dialog-action="save">OK</a>&nbsp;<a data-wysihtml5-dialog-action="cancel">Cancel</a>'+
	    '</div> '+   
	    '<div data-wysihtml5-dialog="insertImage" style="display: none;">'+
	      '<label>Image:<input data-wysihtml5-dialog-field="src" value="http://"></label>'+
	      '<label>Align:'+
	        '<select data-wysihtml5-dialog-field="className">'+
	          '<option value="">default</option>'+
	          '<option value="wysiwyg-float-left">left</option>'+
	          '<option value="wysiwyg-float-right">right</option>'+
	        '</select>'+
	      '</label>'+
	      '<a data-wysihtml5-dialog-action="save">OK</a>&nbsp;<a data-wysihtml5-dialog-action="cancel">Cancel</a>'+
	    '</div>'+    
	  '</div>'+
	'');
	$("#"+containerElementID).append('<textarea id="wysihtml5Editor" style="border-width: 0px; width: 100%; height: 100%"></textarea>');	
}

});