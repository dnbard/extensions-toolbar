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
    
    function getIgnoreList(){
        if (!config.ignore){
            return {};
        }

        return config.ignore;
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
    
    function removeExtFromExt(id){
        if (!config.ignore || !config.ignore[id]){
            return false;
        }

        delete config.ignore[id];
        save(config);
        return true;
    }

    function checkIgnore(id){
        if (!config.ignore){
            return false;
        }
        
        return !!config.ignore[id];
    }
    
    module.exports = {
        getConfig: getConfig,
        save: save,
        ignore: addIgnoreExt,
        unignore: removeExtFromExt,
        checkIgnore: checkIgnore,
        getIgnoreList: getIgnoreList
    }
});
