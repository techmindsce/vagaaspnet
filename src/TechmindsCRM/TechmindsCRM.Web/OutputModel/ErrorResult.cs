using System.Collections.Generic;
using System.Linq;
using TechmindsCRM.Commom.Exceptions;

namespace TechmindsCRM.Web.OutputModel
{
    public class ErrorResult
    {
        public ErrorResult(string error, string title)
        {
            Errors = new List<ErrorMessage> { new ErrorMessage("Erro", error) };
            Title = title;

        }
        public ErrorResult(CRMException ex, string title = "Erro")
        {
            Errors = ex.Erros?.Select(c => new ErrorMessage(c.Key, c.Value)).ToList() ?? new List<ErrorMessage> { new ErrorMessage(title, ex.Message) };
            Title = title;

        }

        public ErrorResult(List<ErrorMessage> errors, string title = "Erro")
        {
            Errors = errors;
            Title = title;

        }

        public List<ErrorMessage> Errors { get; }

        public string Title { get; set; }
    }
}