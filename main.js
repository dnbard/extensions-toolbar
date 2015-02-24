/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    "use strict";

    var ExtensionUtils = brackets.getModule('utils/ExtensionUtils'),
        AppInit = brackets.getModule('utils/AppInit'),
        extensionsToolbar = $('#main-toolbar'),
        statusToolbar = $('#status-info'),
        statusCursor = $('#status-cursor'),
        statusFile = $('#status-file'),
        content = $('.content'),
        contextMenu = require('./contextMenu').menu,
        config = require('./config');

    require('./mainMenu');
    require('./mutationService');
    ExtensionUtils.loadStyleSheet(module, 'css/main.css');

    extensionsToolbar.hide();

    function prepareEditor(){
        statusCursor.css('vertical-align', 'top');
        statusFile.css('vertical-align', 'top');
        content.css('right','0');
    }

    function format(extension){
        var id = require('./contextMenu').getExtensionId(extension[0]);

        if (extension.css('display') !== 'none' && !config.checkIgnore(id)){
            //extension.css('display', 'inline-block');
            extension.removeClass('ext-hidden');
        } else {
            extension.addClass('ext-hidden');
            //extension.css('display', 'none');
        }

        extension.addClass('ext-icon');


        extension.mousedown(function(event){
            if (event.which === 3){
                contextMenu.setTarget(extension);
                contextMenu.open(event);
            }
        });
    }

    AppInit.appReady(function(){
        setTimeout(function(){
            var extensions = extensionsToolbar.find('.buttons > *'),
                holder = $('<div class="extension-toolbar"></div>');

            statusToolbar.prepend(holder);
            for (var i = 0; i < extensions.length; i ++){
                var extension = $(extensions[i]);
                holder.append(extension);
                format(extension);
            }

            prepareEditor();
        }, 2500);
    });

    require('./onlineTracking').init();
});
