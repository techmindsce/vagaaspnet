function request(method, url, params, done, fail, aways) {
    var xhr = $.ajax({ method: method, url: url, data: params })
                  .done(done)
                  .fail(fail)
                  .always(aways);
    return xhr;
};
module.exports = {

    get: function (url, params, done, fail, aways) {
        return request("GET", url, params, done, fail, aways);
    },
    _delete: function (url, params, done, fail, aways) {
        return request("DELETE", url, params, done, fail, aways);
    }

};