using NUnit.Framework;
using TechmindsCRM.Commom.Extensions;

namespace TechmindsCRM.Commom.Test
{
    [TestFixture]
    public class DadoUmStringExtensions
    {
        [Test]
        public void DadoUmaStringQualquerpossoRemoverCaracteresERecuperarSomenteNumeros()
        {
            var expexted = "123456";
            var assert = "1.2.3.4.5/6";
            Assert.AreEqual(expexted, assert.SomenteNumeros());
        }

        [TestCase("123", false)]
        [TestCase("15854754897sdnj23", false)]
        [TestCase("07.149.061/0001-64", true)]
        [TestCase("07149061000164", true)]
        [TestCase("28.665.248/0001-0", false)]
        [TestCase("61.666.926/0001-05", true)]
        public void DadoUmCnpjPossoValidar(string cnpj, bool valido)
        {
            Assert.AreEqual(valido, cnpj.CpfCnpjValido());
        }

        [TestCase("875.514.331-80", true)]
        [TestCase("93343276340", true)]
        [TestCase("875.514.331-", false)]
        [TestCase("875", false)]
        public void DadoUmCpfPossoValidar(string cpf, bool valido)
        {
            Assert.AreEqual(valido, cpf.CpfCnpjValido());
        }
    }
}
