define(["knockout", "plugins/router", "plugins/http", "durandal/app", "services/toastService"], function (ko, router, http, app, toastr) {
    function ClientesViewModel() {
        this.gridUrl = "api/cliente";
        this.collumns = [{ title: "Nome", prop: "nome" }, { title: "CPF/CNPJ", prop: "cpfcnpj", format: "cpfcnpj" },
                         { title: "Email", prop: "email" }, { title: "telefone", prop: "telefones" },
                         { title: "Município", prop: "municipio" }, { title: "UF", prop: "uf" }];
        this.crudBarAPI = ko.observable();
        this.gridAPI = ko.observable();

        //TODO: tipo cliente filtro
        this.nome = ko.observable();
        this.cpfcnpj = ko.observable().extend({ cpfcnpjExtender: {} });
    }

    ClientesViewModel.prototype.attached = function () {
        this.crudBarAPI().disableDeleteAction();
        this.gridAPI().selectedRows.subscribe(function (data) {
            this.crudBarAPI().setSelectedBadge(data.length);
            if (!data.length)
                this.crudBarAPI().disableDeleteAction();
            else
                this.crudBarAPI().enableDeleteAction();
        }, this);
    };

    ClientesViewModel.prototype.onNew = function () {
        router.navigate("cliente#novo");
    };
    ClientesViewModel.prototype.onEdit = function (id) {
        if (id)
            router.navigate("cliente/" + id + "#editar");
    };

    ClientesViewModel.prototype.onDelete = function () {
        var that = this;
        var selectedRows = that.gridAPI().selectedRows();
        if (!selectedRows.length) {
            toastr.showWarning("Selecione pelo menos 1 cliente para excluir.", "Nenhum cliente selecionado!");
            return;
        }
        var modalpromise = app.showMessage("Tem certeza que deseja excluir os clientes selecionados?", "Excluir", ["Sim", "Não"]);
        modalpromise.then(function (res) {
            if (res === "Não")
                return;
            var param = selectedRows.map(function (id) { return "ids=" + id; }).join("&");
            http.remove("api/cliente/?" + param).then(function (response) {
                that.gridAPI().refresh();
                that.gridAPI().selectedRows.removeAll();
                toastr.showSuccess("Cliente(s) removidos com sucesso.", "Sucesso!");
            });
        });
    };

    ClientesViewModel.prototype.defaultAction = function (id) {
        this.onEdit(id);
    };

    ClientesViewModel.prototype.filtrar = function () {
        this.gridAPI().applyFilter({ nome: this.nome(), cpfcnpj: this.cpfcnpj() });
    }
    ClientesViewModel.prototype.limparFiltro = function () {
        this.gridAPI().applyFilter();
        this.nome("");
        this.cpfcnpj("");
    }

    return ClientesViewModel;
})