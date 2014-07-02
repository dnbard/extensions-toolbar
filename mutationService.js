define(function (require, exports, module) {
    var target = $('body')[0];
    
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes && mutation.addedNodes.length === 1){
                var target = $(mutation.addedNodes[0]),
                    token;
                if (target.find('.extension-manager-dialog.modal').length === 1){
                    console.log('Mutation condition met');
                    
                    var tab = $('<li><a>Hidden</a></li>');
                    tab.click(function(){
                        target.find('.modal-header .active').removeClass('active');
                        tab.addClass('active');
                        
                        target.find('.modal-body .active').removeClass('active');
                        target.find('.modal-body #hidden').addClass('active');
                    });
                    
                    target.find('.nav-tabs').append(tab);
                    
                    var panel = $('');
                    target.find('.modal-body').append(panel);
                    
                    
                    /*token = setInterval(function(){
                        var extension = target.find('tr'),
                            extensionCount = target.find('tr').length;
                        if (extensionCount == 0){
                            return;
                        }
                        
                        clearInterval(token);
                        console.log('Found ' + extensionCount + ' extensions');
                    },1000);*/
                }
            }
        });
    });
    
    var config = { attributes: true, childList: true, characterData: true };
    observer.observe(target, config);
});