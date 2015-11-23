using System.Data.Entity;
using TechmindsCRM.Commom.Interfaces;

namespace TechmindsCRM.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private DbContextTransaction transaction;
        private bool rolledback;
        public DbContext Context { get; }


        public UnitOfWork(CRMContext context)
        {
            Context = context;
            StartTransaction();
        }

        public void StartTransaction()
        {
            transaction = Context.Database.BeginTransaction();
        }

        public void Commit()
        {
            if (rolledback) return;

            Context.SaveChanges();
            transaction.Commit();
        }

        public void Save()
        {
            if (!rolledback)
                Context.SaveChanges();
        }

        public void Rollback()
        {
            transaction.Rollback();
            rolledback = true;
        }

        public void Dispose()
        {
            if (!rolledback)
                Commit();
        }
    }
}
