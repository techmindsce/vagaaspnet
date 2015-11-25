using Ninject;
using TechmindsCRM.IoC.WebModules;

namespace TechmindsCRM.IoC
{
    public static class IoCConfigure
    {
        public static IKernel CreateKernel() => new StandardKernel();

        public static IKernel CreateKernelWeb()
        {
            var kernel = new StandardKernel();
            kernel.Load<WebDefaultModule>();
            return kernel;
        }
    }
}
