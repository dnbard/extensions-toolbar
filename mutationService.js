define(function (require) {
    var $ = window.jQuery,
        target = $('body')[0],
        appConfig = require('./config'),
        _ = require('./vendor/lodash.min');
    
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

    var observer = new window.MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes && mutation.addedNodes.length === 1){
                var target = $(mutation.addedNodes[0]);
                if (target.find('.extension-manager-dialog.modal').length === 1){
                    console.log('Mutation condition met');
                    
                    var tab = $('<li><a>Hidden</a></li>'),
                        ignoreList = appConfig.getIgnoreList(),
                        panelTemplate = require('text!./templates/manager.html'),
                        extTemplate = require('text!./templates/manager_ext.html');
                    
                    tab.click(function(){
                        target.find('.modal-header .active').removeClass('active');
                        tab.addClass('active');
                        
                        target.find('.modal-body .active').removeClass('active');
                        target.find('.modal-body #hidden').addClass('active');
                    });
                    
                    target.find('.nav-tabs').append(tab);
                    
                    var panel = $(panelTemplate),
                        table = panel.find('tbody');
                    target.find('.modal-body').append(panel);
                    
                    _.each(ignoreList, function(ext, extName){
                        var row = $(_.template(extTemplate,{
                            background: ext.image,
                            name: extName
                        }));
                        table.append(row);
                        
                        row.find('button').click(function(event){
                            var $target = $(event.target),
                                id = $target.attr('data-extension-id');
                            
                            if (typeof id !== 'string' || id.length === 0){
                                throw new Error('Can\'t find propper Id');
                            }

                            if (appConfig.unignore(id)){
                                getExtensionDom(id).css('display', 'inline-block');
                                table.find('.extension[data-extension-id=' + id +']').remove();
                            }
                        });
                    });
                }
            }
        });
    });
    
    var config = { attributes: true, childList: true, characterData: true };
    observer.observe(target, config);
});
