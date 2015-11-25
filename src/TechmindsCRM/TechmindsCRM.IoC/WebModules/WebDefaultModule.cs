using System.Reflection;
using Ninject.Extensions.Conventions;
using Ninject.Modules;
using Ninject.Web.Common;
using TechmindsCRM.Commom.Interfaces;
using TechmindsCRM.Core.Models;
using TechmindsCRM.Data;

namespace TechmindsCRM.IoC.WebModules
{
    public class WebDefaultModule : NinjectModule
    {
        public override void Load()
        {
            Kernel.Bind(c => c.From(Assembly.GetAssembly(typeof(IUnitOfWork)), Assembly.GetAssembly(typeof(Cliente)), Assembly.GetAssembly(typeof(CRMContext)))
                            .SelectAllClasses()
                            .BindDefaultInterfaces()
                            .Configure(ctx => ctx.InRequestScope()));
        }
    }
}
