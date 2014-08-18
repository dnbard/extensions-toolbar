define(function(require){
    var CommandManager = brackets.getModule('command/CommandManager'),
        Menus = brackets.getModule('command/Menus'),
        fileMenu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU),
        COMMAND_ID = 'ext_toolbar_menuitem',
        contextMenu = require('./contextMenu');

    function menuItemHandler(){
        contextMenu.showSettings();
    }

    CommandManager.register("Show extensions settings", COMMAND_ID, menuItemHandler);
    fileMenu.addMenuItem(COMMAND_ID, null, Menus.AFTER, Menus.MenuSection.FILE_EXTENSION_MANAGER.sectionMarker);
});
