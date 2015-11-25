ko.bindingHandlers["doubleClick"] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var handler = valueAccessor.bind(bindingContext)();
        ko.utils.registerEventHandler(element, "dblclick", function (e) {
            handler(viewModel, e);
        });
    }
};