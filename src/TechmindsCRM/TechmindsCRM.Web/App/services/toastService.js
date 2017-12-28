define([], function () {
    toastr.options = {
        closeButton: true,
        newestOnTop: true,
        progressBar: true,
        positionClass: "toast-bottom-full-width",
        preventDuplicates: true,
        showDuration: 300,
        hideDuration: 1000,
        timeOut: 5000,
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
    }
    return {
        showSuccess: function (message, title, timer) {
            toastr["success"](message, title, { timeOut: timer || 2000 });
        },
        showError: function (message, title, timer) {
            toastr["error"](message, title, { timeOut: timer || 2000 });
        },
        showWarning: function (message, title, timer) {
            toastr["warning"](message, title, { timeOut: timer || 2000 });
        }
    };
});