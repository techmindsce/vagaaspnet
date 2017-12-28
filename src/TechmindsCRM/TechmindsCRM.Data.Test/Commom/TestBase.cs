using System.Data.Entity;
using Ninject;
using Ninject.MockingKernel.NSubstitute;
using NUnit.Framework;
using TechmindsCRM.Commom.Interfaces;

namespace TechmindsCRM.Data.Test.Commom
{
    public class TestBase
    {
        protected NSubstituteMockingKernel kernel;
        protected UnitOfWork uow;

        public TestBase()
        {
            kernel = new NSubstituteMockingKernel();
        }

        public void AbreTransacao()
        {
            kernel.Unbind<IUnitOfWork>();
            uow = kernel.Get<UnitOfWork>();
            kernel.Bind<IUnitOfWork>().ToConstant(uow);
        }

        protected T DetachEntity<T>(T entidade) where T : class
        {
            uow.Context.Entry(entidade).State = EntityState.Detached;
            return entidade;
        }
        [TearDown]
        public void Rollback()
        {
            uow.Rollback();
            uow.Dispose();
        }
    }
}
