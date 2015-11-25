using AgendaDeClientes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AgendaDeClientes.DAL
{
    public class ClienteInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<ClienteContext>
    {
        protected override void Seed(ClienteContext context)
        {
            var cliente = new List<Cliente>
            {
                new Cliente { Nome = "Miguel Angel Moya", Email = "moya@atletico.com", DataNascimento = Convert.ToDateTime("1984-04-02"), Telefone = "(85)989887765", Endereco="RUA A, PAPICU, FORTALEZA" },
                new Cliente { Nome = "Diedo Godin", Email = "diego@atletico.com", DataNascimento = Convert.ToDateTime("1986-02-16"), Telefone = "(85)998765876", Endereco="RUA 3, JUREMA, CAUCAIA" },
                new Cliente { Nome = "Stefan Savic", Email = "savic@atletico.com", DataNascimento = Convert.ToDateTime("1991-01-08"), Telefone = "(85)988765490", Endereco="RUA G, BENFICA, FORTALEZA" },
                new Cliente { Nome = "Juan Francisco", Email = "juan@atletico.com", DataNascimento = Convert.ToDateTime("1985-01-09"), Telefone = "(85)987980346", Endereco="RUA H, MEIRELES, FORTALEZA" },
                new Cliente { Nome = "Filipe Luis", Email = "filipe@atletico.com", DataNascimento = Convert.ToDateTime("1985-08-09"), Telefone = "(85)989123567", Endereco="RUA 123, ALDEOTA, FORTALEZA" },
                new Cliente { Nome = "Gabriel Fernandez", Email = "gabi@atletico.com", DataNascimento = Convert.ToDateTime("1983-07-10"), Telefone = "(85)985091267", Endereco="RUA XYZ, SIQUEIRA, FORTALEZA" },
                new Cliente { Nome = "Jorge Resurreccion", Email = "koke@atletico.com", DataNascimento = Convert.ToDateTime("1992-01-08"), Telefone = "(85)998765023", Endereco="RUA PER, MESSEJANA, FORTALEZA" },
                new Cliente { Nome = "Angel Correa", Email = "correa@atletico.com", DataNascimento = Convert.ToDateTime("1991-03-21"), Telefone = "(85)991876548", Endereco="RUA QWE, CAJAZEIRAS, FORTALEZA" },
                new Cliente { Nome = "Antoine Griezmann", Email = "griezmann@atletico.com", DataNascimento = Convert.ToDateTime("2015-01-01"), Telefone = "(85)985678909", Endereco="RUA 466, PARANGABA, FORTALEZA" },
                new Cliente { Nome = "Yannick Ferreira Carrasco", Email = "carrasco@atletico.com", DataNascimento = Convert.ToDateTime("1993-12-05"), Telefone = "(85)981238765", Endereco="RUA 678, MONTESE, FORTALEZA" },
                new Cliente { Nome = "Luciano Vietto", Email = "vietto@atletico.com", DataNascimento = Convert.ToDateTime("2015-09-04"), Telefone = "(85)997561091", Endereco="RUA 987, MARAPONGA, FORTALEZA" }
            };

            cliente.ForEach(s => context.tbClientes.Add(s));
            context.SaveChanges();
        }
    }
}