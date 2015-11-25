define(["knockout"], function (ko) {
    function ClienteViewModel(data) {
        data = data || {};
        this.id = ko.observable(data.id || 0);
        this.nome = ko.observable(data.nome);
        this.cpfcnpj = ko.observable(data.cpfcnpj).extend({ cpfcnpjExtender: {} });
        this.telefones = ko.observable(data.telefones);
        this.email = ko.observable(data.email);
        this.cep = ko.observable(data.cep);
        this.logradouro = ko.observable(data.logradouro);
        this.complemento = ko.observable(data.complemento);
        this.numero = ko.observable(data.numero);
        this.bairro = ko.observable(data.bairro);
        this.municipio = ko.observable(data.municipio);
        this.uf = ko.observable(data.uf);
    }

    return ClienteViewModel;
});