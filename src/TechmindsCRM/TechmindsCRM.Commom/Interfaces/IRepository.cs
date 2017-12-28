using System;
using System.Linq;
using System.Linq.Expressions;
using TechmindsCRM.Commom.Abstract;

namespace TechmindsCRM.Commom.Interfaces
{
    public interface IRepository<TEntity> where TEntity : Entidade
    {
        TEntity Find(long id);

        IQueryable<TEntity> Filter(string q);

        IQueryable<TEntity> Filter(Expression<Func<TEntity, bool>> predicate);

        IQueryable<TEntity> List();

        TEntity Include(TEntity entidade);

        TEntity Update(TEntity entidade);

        void Delete(long id);

        void Delete(TEntity entidade);

        void DeleteRange(params long[] ids);
    }
}
