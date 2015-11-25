define(["jquery", "plugins/router", "services/toastService"], function ($, router, toastService) {
    $(document).ajaxComplete(function (ev, xhr, settings) {
        if (xhr.status === 400) {
            var errorResponse = JSON.parse(xhr.responseText);
            var message = "<ul>";
            errorResponse.errors.forEach(function (error) {
                message += "<li><strong>" + error.title + "</strong> - " + error.message + "</li>";
            });
            message += "</ul>";
            toastService.showError(message, errorResponse.title, 5000);
        }
        if (xhr.status === 500) {
            toastService.showError("Ops! Desculpe ocorreu um erro inesperados. =(", "Erro Inesperado", 5000);
            router.navigateBack();
        }
        if (xhr.status === 404) {
            toastService.showWarning("Ops! Não consegui encontrar o recurso. =(", "Não Encontrado", 5000);
            router.navigateBack();
        }
    });
});