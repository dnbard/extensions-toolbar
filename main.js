/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
    "use strict";
    
    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus");
    
    function getClickHandler(extension){
        return function(){
            extension.trigger('click');
        }
    }
    
    $('#main-toolbar').hide();
    
    function prepareEditor(){
        $('#status-cursor').css('vertical-align', 'top');
        $('#status-file').css('vertical-align', 'top');
        $('.content').css('width','100%');
        $('.CodeMirror-vscrollbar').css('position', 'fixed');
    }

    $(document).ready(function(){
        setTimeout(function(){
            var extensions = $('#main-toolbar > .buttons > a'),
                holder = $('<div></div>');

            $('#status-info').prepend(holder);
            
            for (var i = 0; i < extensions.length; i ++){
                var extension = $(extensions[i]);
                
                holder.append(extension);
                extension.css('display', 'inline-block');
                extension.css('width', '24px');
                extension.css('height', '24px');
            }
            
            prepareEditor();
       }, 1000);
   });
});