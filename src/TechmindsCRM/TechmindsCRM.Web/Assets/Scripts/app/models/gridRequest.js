function GridRequest(data) {
    data = data || {};
    this.pageLength = ko.observable(data.pageLength || 10);
    this.query = ko.observable(data.query || "");
    this.currentPage = ko.observable(data.currentPage || 1);
    this.totalPages = ko.observable(data.totalPages || 1);
    this.data = ko.observableArray(data.data || []);
}
module.exports = GridRequest;