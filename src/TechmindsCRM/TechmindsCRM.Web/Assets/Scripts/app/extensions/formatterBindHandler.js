ko.bindingHandlers["formatter"] = {
    init: function () {

    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var format = ko.unwrap(valueAccessor());
        var text = ko.unwrap(allBindings.get("text")) || "";
        var nvalue;
        if (format === "cpfcnpj") {
            if (text.length === 11)
                nvalue = text.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
            else if (text.length === 14)
                nvalue = text.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
            $(element).text(nvalue);
            return;
        }
        if (/function()/.test(format)) {
            var formatterFunction = eval("(" + format + ")");
            $(element).text(formatterFunction(text));
        }
    }

};