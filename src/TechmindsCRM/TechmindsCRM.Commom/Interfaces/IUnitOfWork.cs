using System;
using System.Data.Entity;

namespace TechmindsCRM.Commom.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        DbContext Context { get; }

        void StartTransaction();

        void Commit();

        void Save();

        void Rollback();

    }
}
