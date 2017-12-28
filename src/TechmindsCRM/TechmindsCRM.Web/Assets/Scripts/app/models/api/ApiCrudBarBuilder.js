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