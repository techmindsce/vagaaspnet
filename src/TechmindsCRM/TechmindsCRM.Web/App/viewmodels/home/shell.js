define(["plugins/router", "plugins/http", "durandal/app"], function (router, http, app) {
    var self = this;
    this.routes_structure = ko.observableArray(
        [
            {
                "route": "",
                "title": "Home",
                "moduleId": "viewmodels/home/home",
                "nav": true,
                "classIcon": "fa-home"
            },
            {
                "route": "clientes",
                "title": "Clientes",
                "moduleId": "viewmodels/cliente/index",
                "nav": true,
                "classIcon": "fa-users"
            },
            {
                "route": "cliente#novo",
                "title": "Novo Cliente",
                "moduleId": "viewmodels/cliente/dados"
            },
            {
                "route": "cliente(/:id)#editar",
                "title": "Editar Cliente",
                "moduleId": "viewmodels/cliente/dados"
            },
        ]
        );
    router.on("router:navigation:attached", function () {
        var interval = setInterval(handllerIntervalToResize, 100);
        function handllerIntervalToResize() {
            $(document).resize();
            clearInterval(interval);
        }
    });

    return {
        router: router,
        search: function () {
            app.showMessage("Ops! Pesquisa em construção...");
        },
        activate: function () {
            router.map(self.routes_structure()).buildNavigationModel();
            return router.activate();
        }
    };
});