exports.convertObjectToSerializable = function (obj) {
    if (obj instanceof Array) {
        return obj.map(exports.convertObjectToSerializable);
    } else if (obj instanceof dw.util.Collection) { // api collections
        return obj.toArray().map(exports.convertObjectToSerializable);
    } else if (typeof obj === "number" || typeof obj === "string" || typeof obj === 'boolean' || typeof obj === "undefined" || obj === null) {
        // primitives
        return obj;
    } else if (obj instanceof dw.util.Map) {
        // eslint-disable-next-line no-prototype-builtins
        var _obj = {};
        var it = obj.entrySet().iterator();
        while (it.hasNext()) {
            var entry = it.next();
            _obj[entry.getKey()] = exports.convertObjectToSerializable(entry.getValue());
        }
        return _obj;
    } else if (obj instanceof Object) {
        var _obj = {};
        for (var p in obj) {
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty(p)) {
                _obj[p] = exports.convertObjectToSerializable(obj[p]);
            }
        }
        return _obj;
    }
};
