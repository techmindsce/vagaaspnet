define(["knockout", "plugins/router", "plugins/http", "services/toastService", "models/Cliente"], function (ko, router, http, toastr, Cliente) {

    function ClienteViewModel() {
        this.model = ko.observable(new Cliente());
    };

    ClienteViewModel.prototype.save = function () {

        if (this.model().id())
            http.put("api/cliente", this.model()).then(function () {
                toastr.showSuccess("Cliente alterado com sucesso.", "Sucesso!");
                router.navigate("clientes");
            });
        else
            http.post("api/cliente", this.model()).then(function () {
                toastr.showSuccess("Cliente cadastrado com sucesso.", "Sucesso!");
                router.navigate("clientes");
            });
    };

    ClienteViewModel.prototype.cancel = function () {
        router.navigate("clientes");
    };

    ClienteViewModel.prototype.activate = function (id) {
        var self = this;
        if (id)
            http.get("api/cliente/" + id).then(function (response) {
                self.model(new Cliente(response));
            });
    };
    return ClienteViewModel;
});

