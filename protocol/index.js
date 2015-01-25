exports.JRes = (function () {

    function JRes(success, data) {
        this.success = success;
        this.data = data;
    }

    JRes.success = function(data) {
        return new JRes(true, data);
    };

    JRes.fail = function() {
        return new JRes(false, undefined);
    };

    JRes.of = function(data) {
        if (data) {
            return JRes.success(data);
        }
        else {
            return JRes.fail();
        }
    };

    return JRes;
})();