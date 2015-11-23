using NUnit.Framework;
using TechmindsCRM.Data.Test.Commom;

namespace TechmindsCRM.Data.Test
{
    [TestFixture]
    public class DadoUmRepository : TestBase
    {
        [SetUp]
        public void Setup()
        {
            kernel.Reset();
        }
    }
}
