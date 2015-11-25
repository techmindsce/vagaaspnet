(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require("./extensions/cpfcnpjExtender.js");
require("./extensions/doubleClickBindHandler.js");
require("./extensions/formatterBindHandler.js");
require("./components/register-all.js");

},{"./components/register-all.js":11,"./extensions/cpfcnpjExtender.js":12,"./extensions/doubleClickBindHandler.js":13,"./extensions/formatterBindHandler.js":14}],2:[function(require,module,exports){
ko.components.register("crud-bar", {
    viewModel: require("./ViewModel.js"),
    template: require("./Template.html")
});
},{"./Template.html":3,"./ViewModel.js":4}],3:[function(require,module,exports){
module.exports = "﻿<div classs=\"btn-group\">\r\n    <!--ko if: newActionVisible-->\r\n    <button class=\"btn btn-success\" data-bind=\"click: $data.new, enable: newActionEnabled\">\r\n        <span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Novo\r\n    </button>\r\n    <!--/ko-->\r\n    <!--ko if: editActionVisible-->\r\n    <button class=\"btn btn-default\" data-bind=\"click: edit, enable: editActionEnable\">\r\n        <span class=\"glyphicon glyphicon-edit\" aria-hidden=\"true\"></span> Editar\r\n    </button>\r\n    <!--/ko-->\r\n    <!--ko if: deleteActionVisible-->\r\n    <button class=\"btn btn-danger\" type=\"button\" data-bind=\"click: $data.delete, enable: deleteActionEnable\">\r\n        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span> Excluir\r\n        <span class=\"badge\" data-bind=\"visible:selectedCountBadge, text: selectedCountBadge\"></span>\r\n    </button>\r\n    <!--/ko-->\r\n</div>";

},{}],4:[function(require,module,exports){
var apiBuilder = require("../../models/api/ApiCrudBarBuilder");
function CrudBarViewModel(params) {
    this.onNew = new ko.subscribable();
    this.onEdit = new ko.subscribable();
    this.onDelete = new ko.subscribable();

    this.selectedCountBadge = ko.observable(0);

    this.newActionVisible = ko.observable(params.withNewAction || (params.withNewAction == undefined || params.withNewAction == null));
    this.newActionEnabled = ko.observable(params.newActionEnable || (params.newActionEnable == undefined || params.newActionEnable == null));

    this.editActionVisible = ko.observable(params.withEditAction || (params.withEditAction == undefined || params.withEditAction == null));
    this.editActionEnable = ko.observable(params.editActionEnable || (params.editActionEnable == undefined || params.editActionEnable == null));;

    this.deleteActionVisible = ko.observable(params.withDeleteAction || (params.withDeleteAction == undefined || params.withDeleteAction == null));
    this.deleteActionEnable = ko.observable(params.deleteActionEnable || (params.deleteActionEnable == undefined || params.deleteActionEnable == null));

    this.onNew.subscribe(function () {
        params.onNew && params.onNew();
    }, this);

    this.onEdit.subscribe(function () {
        params.onEdit && params.onEdit();
    }, this);

    this.onDelete.subscribe(function () {
        params.onDelete && params.onDelete();
    }, this);

    params.crudBarAPI && ko.isObservable(params.crudBarAPI) ? params.crudBarAPI(apiBuilder(this)) : params.crudBarAPI = apiBuilder(this);

};

CrudBarViewModel.prototype.setSelectedCount = function (count) {
    this.selectedCountBadge(count);
};

CrudBarViewModel.prototype.new = function () {
    this.onNew.notifySubscribers();
};

CrudBarViewModel.prototype.disableNew = function () {
    this.newActionEnabled(false);
};
CrudBarViewModel.prototype.enableNew = function () {
    this.newActionEnabled(true);
};
CrudBarViewModel.prototype.delete = function () {
    this.onDelete.notifySubscribers();
};
CrudBarViewModel.prototype.disableDelete = function () {
    this.deleteActionEnable(false);
};
CrudBarViewModel.prototype.enableDelete = function () {
    this.deleteActionEnable(true);
};

CrudBarViewModel.prototype.edit = function () {
    this.onEdit.notifySubscribers();
};

CrudBarViewModel.prototype.disableEdit = function () {
    this.editActionEnable(false);
};
CrudBarViewModel.prototype.enableEdit = function () {
    this.editActionEnable(true);
};

module.exports = CrudBarViewModel;
},{"../../models/api/ApiCrudBarBuilder":16}],5:[function(require,module,exports){
ko.components.register("grid", {
    viewModel: require("./ViewModel.js"),
    template: require("./Template.html")
});
},{"./Template.html":6,"./ViewModel.js":7}],6:[function(require,module,exports){
module.exports = "﻿<div class=\"box\">\r\n    <div class=\"box-body\">\r\n        <div class=\"dataTables_wrapper form-inline dt-bootstrap\">\r\n            <div class=\"row\">\r\n                <div class=\"col-sm-12\">\r\n                    <table role=\"grid\" class=\"table table-bordered table-hover dataTable\">\r\n                        <thead>\r\n                            <tr>\r\n                                <!--ko if: isMultiSelect-->\r\n                                <td class=\"col-sm-1 text-center\"><input type=\"checkbox\" data-bind=\"checked: checkAll\" /></td>\r\n                                <!--/ko-->\r\n                                <!--ko foreach: collumns-->\r\n                                <th data-bind=\"text:title\"></th>\r\n                                <!--/ko-->\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody data-bind=\"foreach: dataSource().dataSet\">\r\n                            <tr role=\"row\" class=\"odd\" data-bind=\"doubleClick: $parent.defaultAction.bind($parent)\" title=\"De dois cliques na linha para editar item.\">\r\n                                <!--ko if: $parent.isMultiSelect-->\r\n                                <td class=\"col-sm-1 text-center\"><input type=\"checkbox\" data-bind=\"value:$data.id, checked:$parent.selectedRows\" /></td>\r\n                                <!--/ko-->\r\n                                <!--ko foreach: $parent.collumns-->\r\n                                <td data-bind=\"text: $parent[$data.prop], formatter: $data.format\"></td>\r\n                                <!--/ko-->\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-sm-5\"></div>\r\n                <div class=\"col-sm-7\"><page-control class=\"right\" params=\"{totalPages: totalPages, currentPage: currentPage, onGoTo: goToPage.bind($data), onNext: next.bind($data), onPrev:prev.bind($data)}\"></page-control></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

},{}],7:[function(require,module,exports){
var GridDataSource = require("../../models/gridDataSource");
var apiBuilder = require("../../models/api/ApiGridBuilder");
function GridViewModel(params) {
    params = params || {};
    var self = this;
    this.name = ko.observable(params.name);


    this.onRefresh = new ko.subscribable();

    this.onRefreshCallback = function (data) {
        this.onRefresh.notifySubscribers(data);
    }
    this.isMultiSelect = ko.observable(params.isMultiSelect || (params.isMultiSelect == undefined || params.isMultiSelect == null));

    this.defaulActionCallback = params.defaultAction;

    this.collumns = ko.observableArray(params.collumns);

    this.dataSource = ko.observable(new GridDataSource({ url: params.url, defaultAction: params.defaulAction, onRefresh: this.onRefreshCallback.bind(this) }));

    this.selectedRows = ko.observableArray([]);
    //TODO: selected rows on current page
    this.totalPages = ko.computed(function () {
        return this.dataSource().gridRequest().totalPages();
    }, this);

    this.currentPage = ko.computed(function () {
        return this.dataSource().gridRequest().currentPage();
    }, this);

    this.checkAll = ko.computed({
        read: function () {
            return this.selectedRows().length === this.dataSource().dataSet().length;
        },
        write: function (value) {
            if (value) {
                self.selectedRows.removeAll();
                this.dataSource().dataSet().forEach(function (item) {
                    self.selectedRows.push(item.id);
                });
            } else {
                this.selectedRows.removeAll();
            }
        },
        owner: this
    });

    params.gridAPI && ko.isObservable(params.gridAPI) ? params.gridAPI(apiBuilder(this)) : params.gridAPI = apiBuilder(this);

    this.dataSource().refresh();
};

GridViewModel.prototype.defaultAction = function (rowObject) {
    this.defaulActionCallback && this.defaulActionCallback(rowObject["id"]);
}

GridViewModel.prototype.refresh = function () {
    this.dataSource().refresh();
}
GridViewModel.prototype.filter = function (filter) {
    this.dataSource().refresh(filter);
}

GridViewModel.prototype.goToPage = function (pageNumber) {
    this.dataSource().goto(pageNumber);
};

GridViewModel.prototype.next = function () {
    this.dataSource().next();
};

GridViewModel.prototype.prev = function () {
    this.dataSource().prev();
};

module.exports = GridViewModel;
},{"../../models/api/ApiGridBuilder":17,"../../models/gridDataSource":18}],8:[function(require,module,exports){
ko.components.register("page-control", {
    viewModel: require("./ViewModel.js"),
    template: require("./Template.html")
});
},{"./Template.html":9,"./ViewModel.js":10}],9:[function(require,module,exports){
module.exports = "﻿<div class=\"dataTables_paginate paging_simple_numbers\" data-bind=\"visible: totalPages()>1\">\r\n    <ul class=\"pagination\">\r\n        <li data-bind=\"css:{'disabled':!prevPageEnable()}\"><a aria-label=\"Previous\" data-bind=\"click:prev\"><span aria-hidden=\"true\">&laquo;</span></a></li>\r\n        <!--<li data-bind=\"css:{'disabled':!nextPageEnable()},visible: ellipisisPrev\"><span>...</span></li>-->\r\n        <!--ko foreach: pages-->\r\n        <li data-bind=\"css:{'active': $data.current}\"><a data-bind=\"text:$data.value, click: $parent.goTo.bind($parent,$data.value)\"> <span class=\"sr-only\"></span></a></li>\r\n        <!--/ko-->\r\n        <li data-bind=\"css:{'disabled':!nextPageEnable()},visible: ellipisisNext\"><span>...</span></li>\r\n        <li data-bind=\"css:{'disabled':!nextPageEnable()}\"><a aria-label=\"Next\" data-bind=\"click:next\"><span aria-hidden=\"true\">&raquo;</span></a></li>\r\n    </ul>\r\n</div>";

},{}],10:[function(require,module,exports){
function PageControlViewModel(params) {
    this.totalPages = ko.isObservable(params.totalPages) ? params.totalPages : ko.observable(params.totalPages);
    this.currentPage = ko.isObservable(params.currentPage) ? params.currentPage : ko.observable(params.currentPage);
    this.controlSize = ko.observable(params.controlSize || 5);

    this.pages = ko.computed(function () {
        var result = [];

        if (this.totalPages() <= this.controlSize())
            for (var i = 0; i < this.totalPages() ; i++)
                result.push({ value: i + 1, current: (i + 1) === this.currentPage() });

        else if (this.currentPage() > this.controlSize())
            for (var i = (this.currentPage() - this.controlSize()) + 1 ; i <= this.currentPage() ; i++)
                result.push({ value: i, current: (i) === this.currentPage() });
        else
            for (var i = 0; i < this.controlSize() ; i++)
                result.push({ value: i + 1, current: (i + 1) === this.currentPage() });

        return result;
    }, this);

    this.prevPageEnable = ko.computed(function () {
        return this.currentPage() > 1;
    }, this);

    this.nextPageEnable = ko.computed(function () {
        return this.currentPage() < this.totalPages();
    }, this);

    this.ellipisisNext = ko.computed(function () {
        return (this.totalPages() > this.controlSize()) && (this.totalPages() - this.currentPage()) > 0;
    }, this);

    this.ellipisisPrev = ko.computed(function () {
        return (this.currentPage() - this.controlSize()) > 0;
    }, this);

    this.onNextCallback = params.onNext;
    this.onPrevCallback = params.onPrev;
    this.onGoToCallback = params.onGoTo;
    this.onChangeCallback = params.onChange;

    this.onChange = new ko.subscribable();
    this.onGoTo = new ko.subscribable();
    this.onNext = new ko.subscribable();
    this.onPrev = new ko.subscribable();

    this.onChange.subscribe(function (page) {
        this.onChangeCallback && this.onChangeCallback(page);
    }, this);
    this.onNext.subscribe(function (page) {
        this.onChange.notifySubscribers(page);
        this.onNextCallback && this.onNextCallback(page);
    }, this);
    this.onPrev.subscribe(function (page) {
        this.onChange.notifySubscribers(page);
        this.onPrevCallback && this.onPrevCallback(page);
    }, this);
    this.onGoTo.subscribe(function (page) {
        this.onChange.notifySubscribers(page);
        this.onGoToCallback && this.onGoToCallback(page);
    }, this);


};

PageControlViewModel.prototype.next = function (page) {
    if (!this.nextPageEnable()) return;
    this.onNext.notifySubscribers(page);
};
PageControlViewModel.prototype.prev = function (page) {
    if (!this.prevPageEnable()) return;
    this.onPrev.notifySubscribers(page);
};


PageControlViewModel.prototype.goTo = function (page) {
    this.onGoTo.notifySubscribers(page);
};

module.exports = PageControlViewModel;
},{}],11:[function(require,module,exports){
require("./page-control/Register");
require("./crud-bar/Register");
require("./grid/Register");
ko.applyBindings({});
},{"./crud-bar/Register":2,"./grid/Register":5,"./page-control/Register":8}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
ko.bindingHandlers["doubleClick"] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var handler = valueAccessor.bind(bindingContext)();
        ko.utils.registerEventHandler(element, "dblclick", function (e) {
            handler(viewModel, e);
        });
    }
};
},{}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
function ApiCrudBarBuilder(gridScope) {
    return {
        disableNewAction: gridScope.disableNew.bind(gridScope),
        enableNewAction: gridScope.enableNew.bind(gridScope),
        disableDeleteAction: gridScope.disableDelete.bind(gridScope),
        enableDeleteAction: gridScope.enableDelete.bind(gridScope),
        disableEditAction: gridScope.disableEdit.bind(gridScope),
        enableEditAction: gridScope.enableEdit.bind(gridScope),
        setSelectedBadge: gridScope.setSelectedCount.bind(gridScope)
    };
};

module.exports = ApiCrudBarBuilder;
},{}],17:[function(require,module,exports){
function ApiGridBuilder(gridScope) {
    return {
        applyFilter: gridScope.filter.bind(gridScope),
        refresh: gridScope.refresh.bind(gridScope),
        onRefresh: gridScope.onRefresh,
        selectedRows: gridScope.selectedRows
    };
};

module.exports = ApiGridBuilder;
},{}],18:[function(require,module,exports){
var GridRequest = require("./gridRequest");
var ajaxRequest = require("./ajax-request");
function GridDataSource(data) {
    data = data || {};
    var self = this;
    this.url = ko.observable(data.url || "");
    this.urlNotInformed = ko.computed(function () {
        return !this.url();
    }, this);

    this.gridRequest = ko.observable(new GridRequest());

    this.dataSet = ko.computed(function () {
        return this.gridRequest().data();
    }, this);

    this.selected = ko.observableArray();

    this.onRefresh = new ko.subscribable();

    this.onRefresh.subscribe(function () {
        data.onRefresh(this.gridRequest().data());
    }, this);
};

GridDataSource.prototype.next = function () {
    this.gridRequest().currentPage(this.gridRequest().currentPage() + 1);
    this.refresh();
};
GridDataSource.prototype.prev = function () {
    this.gridRequest().currentPage(this.gridRequest().currentPage() - 1);
    this.refresh();
};

GridDataSource.prototype.goto = function (page) {
    this.gridRequest().currentPage(page);
    this.refresh();
};

GridDataSource.prototype.refresh = function (filter) {
    var self = this;
    filter = filter || {};
    var gridRequest = ko.toJS(this.gridRequest());
    delete gridRequest["data"];

    for (var prop in filter) {
        if (filter.hasOwnProperty(prop))
            gridRequest[prop] = filter[prop];
    }
    var params = $.param(gridRequest);

    ajaxRequest.get(this.url(), params,
        function (response) {
            self.gridRequest(new GridRequest(response));
            self.onRefresh.notifySubscribers();
        });
};
module.exports = GridDataSource;


},{"./ajax-request":15,"./gridRequest":19}],19:[function(require,module,exports){
function GridRequest(data) {
    data = data || {};
    this.pageLength = ko.observable(data.pageLength || 10);
    this.query = ko.observable(data.query || "");
    this.currentPage = ko.observable(data.currentPage || 1);
    this.totalPages = ko.observable(data.totalPages || 1);
    this.data = ko.observableArray(data.data || []);
}
module.exports = GridRequest;
},{}]},{},[1]);
