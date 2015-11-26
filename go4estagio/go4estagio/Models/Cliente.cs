using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace go4estagio.Models
{
    public class Cliente
    {

        public int Id { get; set; }
        public String Nome { get; set; }
        public String Endereco { get; set; }
        public String Telefone { get; set; }
        public String Celular { get; set; }
        public String Email { get; set; }
        public DateTime Nascimento { get; set; }
    }

    public class ClienteContext : DbContext
    {
        public DbSet<Cliente> Clientes { get; set; }
    }
}