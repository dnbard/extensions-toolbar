define(function(require, exports, module){
    var _ = require('./vendor/lodash.min'),
        CommandManager = brackets.getModule('command/CommandManager'),
        Menus = brackets.getModule('command/Menus'),
        contextMenuId = 'ext_toolbar_contextMenu',
        hideCommandId = 'ext_toolbar_hide',
        showSettingsId = 'ext_toolbar_settings',
        contextMenu = Menus.registerContextMenu(contextMenuId),
        contextTarget = null,
        config = require('./config'),
        settings = require("text!./templates/settings.html");
    
    function getExtId(extension){
        if (typeof extension !== 'object'){
            throw new Error('Invalid argument');
        }

        var id = extension.id || extension.className || null;
        return id.replace(' ext-icon', '');
    }
    
    function hideExtension(){
        var id = getExtId(contextTarget),
            $target = $(contextTarget);
        if (typeof id === 'string'){
            config.ignore(id, {
                image: $target.css('background')
            });
            $target.css('display', 'none');
        } else {
            throw new Error('Extension ID must not be NULL. Please report which Brackets Extension throwing this error to https://github.com/dnbard/extensions-toolbar/ as new Issue!');
        }
    }
    
    function getExtensionDom(id){
        if (!id){
            return null;
        }

        var element = $('#'+id);
        if (element.length === 0){
            element = $('.'+id.replace(' ', '.'));
        }

        if (element.length === 0){
            return null;
        }

        return element;
    }

    function showSettings(){
        var Dialogs = brackets.getModule('widgets/Dialogs'),
            dlg = Dialogs.showModalDialogUsingTemplate(settings),
            ignoreList = config.getIgnoreList(),
            modalBody = dlg._$dlg.find('.modal-body');

        if (_.size(ignoreList) === 0){
            modalBody.append('<div class="dialog-message">No extensions are hidden!</div>');
            return;
        } else {
            modalBody.append('<div class="dialog-message">Hidden extensions:</div>');
        }

        _.each(ignoreList, function(value, extension){
            var tmpl = require('text!./templates/settings_ext.html'),
                string = _.template(tmpl, {
                    ext: extension,
                    background: value.image
                });

            modalBody.append(string);
        });

        modalBody.find('.extension > a.btn').click(function(event){
            var id = $(event.target).attr('data-id');

            if (typeof id !== 'string' || id.length === 0){
                throw new Error('Can\'t find propper Id');
            }

            if (config.unignore(id)){
                $(event.target.parentNode).hide();
                getExtensionDom(id).css('display', 'inline-block');

                if (_.size(config.getIgnoreList()) === 0){
                    modalBody.empty();
                    modalBody.append('<div class="dialog-message">No extensions are hidden!</div>');
                }
            }
        });
    }

    CommandManager.register('Hide Extension', hideCommandId, hideExtension);
    CommandManager.register('Show Extension Settings', showSettingsId, showSettings);
    contextMenu.addMenuItem(hideCommandId);
    contextMenu.addMenuDivider();
    contextMenu.addMenuItem(showSettingsId);
    
    contextMenu.setTarget = function (extension){
        if (typeof extension !== 'object'){
            throw new Error('Invalid argument');
        }
        
        contextTarget = extension[0];
    }
    
    exports.id = contextMenuId;
    exports.menu = contextMenu;
    exports.getExtensionId = getExtId;
    exports.showSettings = showSettings;
});
