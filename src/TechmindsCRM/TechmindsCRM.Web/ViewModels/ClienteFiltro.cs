using System.Linq;
using TechmindsCRM.Commom.Extensions;
using TechmindsCRM.Commom.Services;
using TechmindsCRM.Core.Models;

namespace TechmindsCRM.Web.ViewModels
{
    public class ClienteFiltro : GridRequest<Cliente>
    {
        public string Nome { get; set; }
        public string CPFCNPJ { get; set; }

        public override GridRequest<Cliente> ToResult(IQueryable<Cliente> data)
        {
            if (!string.IsNullOrEmpty(Nome))
                data = data.Where(c => c.Nome.Contains(Nome));
            if (!string.IsNullOrEmpty(CPFCNPJ))
            {
                var cpfcnpjLimpo = CPFCNPJ.SomenteNumeros();
                data = data.Where(c => c.CPFCNPJ == cpfcnpjLimpo);
            }
            var orderBy = string.IsNullOrEmpty(OrderBy) ? (c) => c.Id : ExpressionFilter.Selector<Cliente>(OrderBy);

            Data = data.OrderBy(orderBy).Skip(SkipCount()).Take(PageLength).Select(t => t).ToList();
            TotalPages = ((data.Count() + PageLength - 1) / PageLength);
            if (TotalPages <= CurrentPage)
                CurrentPage = TotalPages;
            return this;
        }
    }
}