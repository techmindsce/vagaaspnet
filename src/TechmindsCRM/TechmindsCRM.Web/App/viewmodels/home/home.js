define(function () {
    var ctor = function () {
        this.displayName = "Bem vindo ao Techminds CRM!";
        this.description = "Projeto desenvolvido para auxiliar no gerenciamento de seus clientes.";
        this.features = [
            "Cadastros de Cliente",
            "Pesquisa de Cliente"
        ];
    };
    return ctor;
});