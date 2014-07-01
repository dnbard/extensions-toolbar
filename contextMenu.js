define(function(require, exports, module){
    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus"),
        contextMenuId = 'ext_toolbar_contextMenu',
        hideCommandId = 'ext_toolbar_hide',
        contextMenu = Menus.registerContextMenu(contextMenuId),
        contextTarget = null,
        config = require('./config');
    
    function getExtId(extension){
        return extension.id || null;
    }
    
    function hideExtension(){
        var id = getExtId(contextTarget);
        config.ignore(id);
    }
    
    CommandManager.register('Hide Extension', hideCommandId, hideExtension);
    contextMenu.addMenuItem(hideCommandId);
    contextMenu.setTarget = function (extension){
        if (typeof extension !== 'object'){
            throw new Error('Invalid argument');
        }
        
        contextTarget = extension[0];
    }
    
    exports.id = contextMenuId;
    exports.menu = contextMenu;
    exports.getExtensionId = getExtId;
});