requirejs.config({
    paths: {
        'text': "../Assets/Scripts/vendor/text",
        'durandal': "../Assets/Scripts/vendor/durandal",
        'plugins': "../Assets/Scripts/vendor/durandal/plugins",
        'transitions': "../Assets/Scripts/vendor/durandal/transitions"
    }
});

define("jquery", function () { return jQuery; });
define("knockout", ko);

define(["durandal/system", "durandal/app", "durandal/viewLocator", "services/error-handler"], function (system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = "Techminds CRM";

    app.configurePlugins({
        router: true,
        dialog: true
    });

    app.start().then(function () {
        viewLocator.useConvention();
        app.setRoot("viewmodels/home/shell", "entrance");
    });
});