define(function (require, exports, module) {
    var id = 'ext_toolbar',
        storage = localStorage.getItem(id),
        config = storage? JSON.parse(storage) : {};
    
    function save(newConfig){
        config = newConfig;
        localStorage.setItem(id, JSON.stringify(config));
    }
    
    function getConfig(){
        return config;
    }
    
    function addIgnoreExt(id){
        if (!config.ignore){
            config.ignore = {}
        }
        
        if (config.ignore[id] !== true){
            config.ignore[id] = true;
        }
        
        save(config);
    }
    
    function checkIgnore(id){
        if (!config.ignore){
            return false;
        }
        
        return !!config.ignore[id];
    }
    
    exports.getConfig = getConfig;
    exports.save = save;
    exports.ignore = addIgnoreExt;
    exports.checkIgnore = checkIgnore;
});