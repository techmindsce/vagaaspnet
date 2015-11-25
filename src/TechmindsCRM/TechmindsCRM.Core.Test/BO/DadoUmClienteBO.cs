using Ninject;
using NSubstitute;
using NUnit.Framework;
using TechmindsCRM.Commom.Exceptions;
using TechmindsCRM.Commom.Interfaces;
using TechmindsCRM.Core.BO;
using TechmindsCRM.Core.Models;
using TechmindsCRM.Core.Test.Commom;

namespace TechmindsCRM.Core.Test.BO
{
    [TestFixture]
    public class DadoUmClienteBO : TestBase
    {
        private IRepository<Cliente> todosClientes;
        private ClienteBO _sut;

        [SetUp]
        public void Setup()
        {
            todosClientes = kernel.Get<IRepository<Cliente>>();
            _sut = kernel.Get<ClienteBO>();
        }

        [Test]
        public void AoIncluirNovoClienteLancaExceptionSeNomeNãoEhVazioNemNulo()
        {
            var ex = Assert.Throws<CampoObrigatorioException>(() => _sut.Incluir(new Cliente()));
            Assert.AreEqual("Nome de Cliente é obrigatório.", ex.Message);
        }

        [Test]
        public void AoIncluirNovoClienteLancaExceptionSeCpfCnpjInvalido()
        {
            var ex = Assert.Throws<CpfCnpjInvalidoException>(() => _sut.Incluir(new Cliente { Nome = "Bruce Wayne", CPFCNPJ = "LOL" }));
            Assert.AreEqual("CPF/CNPJ está em formato inválido.", ex.Message);
        }

        [Test]
        public void AoIncluirClienteComCPFIncludeDeRepositoryEhChamado()
        {
            var cliente = new Cliente { Nome = "Bruce Wayne", CPFCNPJ = "875.514.331-80" };
            _sut.Incluir(cliente);
            todosClientes.Received().Include(cliente);
        }

        [Test]
        public void AoIncluirClienteComCNPJIncludeDeRepositoryEhChamado()
        {
            var cliente = new Cliente { Nome = "Bruce Wayne", CPFCNPJ = "07.149.061/0001-64" };
            _sut.Incluir(cliente);
            todosClientes.Received().Include(cliente);
        }

        [Test]
        public void AoAlterarClienteLancaExceptionSeNomeNãoEhVazioNemNulo()
        {
            var ex = Assert.Throws<CampoObrigatorioException>(() => _sut.Alterar(new Cliente()));
            Assert.AreEqual("Nome de Cliente é obrigatório.", ex.Message);
        }

        [Test]
        public void AoAlterarClienteLancaExceptionSeCpfCnpjInvalido()
        {
            var ex = Assert.Throws<CpfCnpjInvalidoException>(() => _sut.Alterar(new Cliente { Nome = "Bruce Wayne", CPFCNPJ = "LOL" }));
            Assert.AreEqual("CPF/CNPJ está em formato inválido.", ex.Message);
        }

        [Test]
        public void AoAltertarClienteValidoUpdateDeRepositoryEhChamado()
        {
            var cliente = new Cliente { Nome = "Bruce Wayne", CPFCNPJ = "875.514.331-80" };
            _sut.Alterar(cliente);
            todosClientes.Received().Update(cliente);
        }

        [Test]
        public void AoDeletarClienteDeleteDeRepositoryEhChamado()
        {
            _sut.Deletar(999);
            todosClientes.Received().Delete(999);
        }

        [Test]
        public void AoFiltrarChamaFilterDeRepository()
        {
            var q = "Teste";
            _sut.Filtrar(q);
            todosClientes.Received().Filter(q);
        }
    }
}
