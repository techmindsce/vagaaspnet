using System;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Linq.Expressions;
using TechmindsCRM.Commom.Abstract;
using TechmindsCRM.Commom.Extensions;
using TechmindsCRM.Commom.Interfaces;

namespace TechmindsCRM.Data.Repositories.Commom
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : Entidade
    {
        private readonly IUnitOfWork _uow;
        private readonly DbSet<TEntity> todosItens;

        public Repository(IUnitOfWork uow)
        {
            _uow = uow;
            todosItens = _uow.Context.Set<TEntity>();
        }

        public IQueryable<TEntity> List() => todosItens;

        public TEntity Find(long id) => todosItens.Find(id);

        public IQueryable<TEntity> Filter(string q)
            => string.IsNullOrWhiteSpace(q) ? List() : List().Where(q);

        public IQueryable<TEntity> Filter(Expression<Func<TEntity, bool>> predicate) => List().Where(predicate);

        public TEntity Include(TEntity entidade)
        {
            todosItens.AddOrUpdate(entidade);
            _uow.Save();
            return entidade;
        }

        public TEntity Update(TEntity entidade)
        {
            todosItens.AddOrUpdate(entidade);
            _uow.Save();
            return entidade;
        }

        public void Delete(long id) => Delete(todosItens.Find(id));

        public void DeleteRange(params long[] ids)
        {
            todosItens.RemoveRange(List().Where(e => ids.Contains(e.Id)));
            _uow.Save();
        }

        public void Delete(TEntity entidade)
        {
            todosItens.Remove(entidade);
            _uow.Save();
        }
    }
}
