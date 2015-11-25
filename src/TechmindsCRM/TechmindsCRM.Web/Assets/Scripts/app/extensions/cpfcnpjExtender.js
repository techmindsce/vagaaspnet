ko.extenders["cpfcnpjExtender"] = function (target) {
    target.formatted = ko.computed({
        read: function () {
            var val = target() || "";
            var formattedValue = onlyNumbers(val);
            if (val.length <= 11)
                formattedValue = val.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
            else {
                formattedValue = val.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
            }
            return formattedValue;
        },
        write: function (newValue) {
            var current = target() || "";
            var valueToWrite = onlyNumbers(newValue);
            if (valueToWrite !== current)
                target(valueToWrite);
            else if (newValue !== current)
                target.notifySubscribers(valueToWrite);
        }
    }).extend({ notify: 'always' });
    return target;
};
function onlyNumbers(str) {
    var newValueAsNum = str.replace(/[A-Za-z.,-/ ]/g, "");
    return newValueAsNum;
}