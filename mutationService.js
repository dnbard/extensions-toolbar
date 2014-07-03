define(function (require, exports, module) {
    var target = $('body')[0],
        appConfig = require('./config'),
        _ = require('./vendor/lodash.min');
    
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes && mutation.addedNodes.length === 1){
                var target = $(mutation.addedNodes[0]),
                    token;
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
                                id = $target.attr('data-extension-id'),
                                row = $(event.target.parentNode.parentNode);
                            
                            if (typeof id !== 'string' || id.length === 0){
                                throw new Error('Can\'t find propper Id');
                            }

                            if (appConfig.unignore(id)){
                                $('#'+id).css('display', 'inline-block');
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