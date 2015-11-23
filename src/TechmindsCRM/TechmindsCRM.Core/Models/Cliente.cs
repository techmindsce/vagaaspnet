using TechmindsCRM.Commom.Abstract;

namespace TechmindsCRM.Core.Models
{
    public class Cliente : Entidade
    {
        public string Nome { get; set; }

        public string CPFCNPJ { get; set; }

        public string Telefones { get; set; }

        public string Email { get; set; }

        public string CEP { get; set; }

        public string Logradouro { get; set; }

        public string Complemento { get; set; }

        public long Numero { get; set; }

        public string Bairro { get; set; }

        public string Municipio { get; set; }

        public string UF { get; set; }
    }
}
