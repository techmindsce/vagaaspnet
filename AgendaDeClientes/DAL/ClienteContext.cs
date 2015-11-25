using AgendaDeClientes.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace AgendaDeClientes.DAL
{
    public class ClienteContext : DbContext
    {
        public ClienteContext()
            :base("DbAgendaClientes")
        {
        }

        public DbSet<Cliente> tbClientes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}