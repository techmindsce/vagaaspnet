using System.Linq;
using TechmindsCRM.Commom.Services;

namespace TechmindsCRM.Commom.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> Where<T>(this IQueryable<T> queryable, string q)
            => string.IsNullOrEmpty(q) ? queryable : queryable.Where(ExpressionFilter.BuildFilterPredicate<T>(q));
    }
}
