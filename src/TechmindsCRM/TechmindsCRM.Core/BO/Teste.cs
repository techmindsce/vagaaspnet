using System.Linq;
using TechmindsCRM.Core.Interfaces;
using TechmindsCRM.Core.Models;

namespace TechmindsCRM.Core.BO
{
    public class Teste : IClienteBO
    {

        public Cliente Alterar(Cliente cliente)
        {
            return null;
        }

        public void Deletar(long id)
        { }

        public IQueryable<Cliente> Filtrar(string q = null)
        {
            return null;
        }

        public Cliente Incluir(Cliente cliente)
        {
            return null;
        }

        public Cliente Procurar(long id)
        {
            return null;
        }

        public void Deletar(params long[] ids)
        { }
    }
}
