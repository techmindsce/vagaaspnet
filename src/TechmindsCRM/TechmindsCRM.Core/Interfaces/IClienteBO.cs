using System.Linq;
using TechmindsCRM.Core.Models;

namespace TechmindsCRM.Core.Interfaces
{
    public interface IClienteBO
    {
        Cliente Alterar(Cliente cliente);
        void Deletar(long id);
        IQueryable<Cliente> Filtrar(string q = null);
        Cliente Incluir(Cliente cliente);
        Cliente Procurar(long id);
        void Deletar(params long[] ids);
    }
}