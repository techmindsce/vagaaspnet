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