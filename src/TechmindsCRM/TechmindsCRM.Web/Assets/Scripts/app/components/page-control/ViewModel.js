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