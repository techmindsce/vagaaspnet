using System.Collections.Generic;
using System.Linq;
using TechmindsCRM.Commom.Abstract;

namespace TechmindsCRM.Web.ViewModels
{
    public class GridRequest<T> where T : Entidade
    {
        public string Query { get; set; }

        public int PageLength { get; set; }

        public int CurrentPage { get; set; }

        public string OrderBy { get; set; }

        public int TotalPages { get; set; }

        public int SkipCount() => CurrentPage == 1 ? 0 : PageLength * (CurrentPage - 1);


        public IEnumerable<T> Data { get; set; }


        public virtual GridRequest<T> ToResult(IQueryable<T> data)
        {
            Data = data.OrderBy(e => e.Id).Skip(SkipCount()).Take(PageLength).Select(t => t).ToList();
            TotalPages = ((data.Count() + PageLength - 1) / PageLength);
            if (TotalPages <= CurrentPage)
                CurrentPage = TotalPages;
            return this;
        }
    }
}