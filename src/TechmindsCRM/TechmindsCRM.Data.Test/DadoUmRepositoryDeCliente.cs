using System.Linq;
using Ninject;
using NUnit.Framework;
using TechmindsCRM.Core.Models;
using TechmindsCRM.Data.Repositories.Commom;
using TechmindsCRM.Data.Test.Commom;

namespace TechmindsCRM.Data.Test
{
    [TestFixture]
    public class DadoUmRepositoryDeCliente : TestBase
    {
        //SUT = System Under Test
        private Repository<Cliente> _sut;
        private Cliente cliente;

        [SetUp]
        public void Setup()
        {
            kernel.Reset();
            AbreTransacao();
            _sut = kernel.Get<Repository<Cliente>>();
            cliente = new Cliente { Nome = "Tony Stark" };
        }

        [Test]
        public void PossoAdicionarNovoCliente()
        {
            _sut.Include(cliente);
            Assert.AreNotEqual(0, cliente.Id);
        }

        [Test]
        public void PossoDeletarPeloIdCliente()
        {
            _sut.Include(cliente);
            Assert.AreEqual(1, uow.Context.Set<Cliente>().Count());
            _sut.Delete(cliente.Id);
            Assert.AreEqual(0, uow.Context.Set<Cliente>().Count());
        }

        [Test]
        public void PossoDeletearCliente()
        {
            _sut.Include(cliente);
            Assert.AreEqual(1, uow.Context.Set<Cliente>().Count());
            _sut.Delete(cliente);
            Assert.AreEqual(0, uow.Context.Set<Cliente>().Count());
        }

        [Test]
        public void PossoAlterarCliente()
        {
            var expectedName = "Bruce Banner";
            _sut.Include(cliente);
            var clienteAlterado = DetachEntity(cliente);
            clienteAlterado.Nome = expectedName;
            _sut.Update(cliente);
            Assert.AreEqual(expectedName, uow.Context.Set<Cliente>().Find(cliente.Id).Nome);
        }

        [Test]
        public void QuandoIdNãoEncontradoRetornaNulo()
        {
            Assert.IsNull(_sut.Find(0));
        }
        [Test]
        public void PossoRecuperarClientePorId()
        {
            _sut.Include(cliente);
            Assert.IsNotNull(_sut.Find(cliente.Id));
        }

        [TestCase(10)]
        public void PossoRecuperarTodosClientes(int expectedCount)
        {
            Enumerable.Range(1, expectedCount).ToList().ForEach(i => _sut.Include(new Cliente { Nome = $"Cliente {i}" }));
            Assert.AreEqual(expectedCount, _sut.List().Count());
        }

        [TestCase("Cliente 1")]
        [TestCase("Cliente 2")]
        [TestCase("Cliente 3")]
        public void PossoFiltrarClientes(string filtroPorNome)
        {
            Enumerable.Range(1, 5).ToList().ForEach(i => _sut.Include(new Cliente { Nome = $"Cliente {i}" }));
            Assert.AreEqual(1, _sut.Filter(c => c.Nome == filtroPorNome).Count());
        }

        [Test]
        public void PossoFiltrarTodosOsClientesQuePossuamDadaStringEmAlgumDeSeusCampos()
        {
            Enumerable.Range(1, 10).ToList().ForEach(i => _sut.Include(new Cliente { Nome = $"Cliente {i}" }));
            Assert.AreEqual(2, _sut.Filter("1").Count());
        }
    }
}
