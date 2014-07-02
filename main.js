/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
    "use strict";
    
    var CommandManager = brackets.getModule('command/CommandManager'),
        Menus = brackets.getModule('command/Menus'),
        ExtensionUtils = brackets.getModule('utils/ExtensionUtils'),
        extensionsToolbar = $('#main-toolbar'),
        statusToolbar = $('#status-info'),
        statusCursor = $('#status-cursor'),
        statusFile = $('#status-file'),
        content = $('.content'),
        scrollBar = $('.CodeMirror-vscrollbar'),
        //give extensions 1 sec to load itself
        extensionsLoadingTimeout = 1000,
        contextMenu = require('./contextMenu').menu,
        config = require('./config');
    
    require('./mainMenu');
    require('./mutationService');
    ExtensionUtils.loadStyleSheet(module, 'css/main.css');

    function getClickHandler(extension){
        return function(){
            extension.trigger('click');
        }
    }
    
    extensionsToolbar.hide();
    
    function prepareEditor(){
        statusCursor.css('vertical-align', 'top');
        statusFile.css('vertical-align', 'top');
        content.css('width','100%');
    }
    
    function controlScrollBarPosition(){
        var documentManager = brackets.getModule('document/DocumentManager');
        $(documentManager).on('currentDocumentChange', onDocumentChange);
    }
    
    function onDocumentChange(){
        $('.CodeMirror-vscrollbar').css('position', 'fixed');
        $('#status-bar').css('z-index', '10');
    }
    
    function format(extension){
        var id = require('./contextMenu').getExtensionId(extension[0]);
        
        if (extension.css('display') !== 'none' && !config.checkIgnore(id)){
            extension.css('display', 'inline-block');
        } else {
            extension.css('display', 'none');
        }
        extension.css('width', '24px');
        extension.css('height', '24px');
        
        extension.mousedown(function(event){
            if (event.which === 3){
                contextMenu.setTarget(extension);
                contextMenu.open(event);
            }
        });
    }

    $(document).ready(function(){
        setTimeout(function(){
            var extensions = extensionsToolbar.find('.buttons > a'),
                holder = $('<div></div>');

            statusToolbar.prepend(holder);
            for (var i = 0; i < extensions.length; i ++){
                var extension = $(extensions[i]);
                holder.append(extension);
                format(extension);
            }
            
            prepareEditor();
        }, extensionsLoadingTimeout);
        controlScrollBarPosition();
   });
});
