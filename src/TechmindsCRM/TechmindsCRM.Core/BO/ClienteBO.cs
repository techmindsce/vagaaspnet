using System;
using System.Collections.Generic;
using System.Linq;
using TechmindsCRM.Commom.Exceptions;
using TechmindsCRM.Commom.Extensions;
using TechmindsCRM.Commom.Interfaces;
using TechmindsCRM.Core.Interfaces;
using TechmindsCRM.Core.Models;

namespace TechmindsCRM.Core.BO
{
    public class ClienteBO : IClienteBO
    {
        private readonly IRepository<Cliente> clientesRepository;
        private static readonly List<Action<Cliente>> _validacoes = new List<Action<Cliente>> { ValidaNome, ValidaCpfCnpj };
        public ClienteBO(IRepository<Cliente> clientesRepository)
        {
            this.clientesRepository = clientesRepository;
        }

        public Cliente Procurar(long id) => clientesRepository.Find(id);

        public Cliente Incluir(Cliente cliente)
        {
            ValidaCliente(cliente);
            PreparaParaSalvar(cliente);
            return clientesRepository.Include(cliente);
        }

        public Cliente Alterar(Cliente cliente)
        {
            ValidaCliente(cliente);
            PreparaParaSalvar(cliente);
            return clientesRepository.Update(cliente);
        }

        private void PreparaParaSalvar(Cliente cliente)
        {
            if (!string.IsNullOrEmpty(cliente.CPFCNPJ))
                cliente.CPFCNPJ = cliente.CPFCNPJ.SomenteNumeros();
        }

        public IQueryable<Cliente> Filtrar(string q = null) => clientesRepository.Filter(q);

        public void Deletar(long id) => clientesRepository.Delete(id);

        public void Deletar(params long[] ids) => clientesRepository.DeleteRange(ids);

        private static void ValidaCliente(Cliente cliente)
            => _validacoes.ForEach(validacao => validacao(cliente));

        private static void ValidaNome(Cliente cliente)
        {
            if (string.IsNullOrEmpty(cliente.Nome))
                throw new CampoObrigatorioException("Nome", "Nome de Cliente é obrigatório.");
        }

        private static void ValidaCpfCnpj(Cliente cliente)
        {
            if (!string.IsNullOrEmpty(cliente.CPFCNPJ) && !cliente.CPFCNPJ.CpfCnpjValido())
                throw new CpfCnpjInvalidoException("CPF/CNPJ está em formato inválido.");
        }
    }
}
