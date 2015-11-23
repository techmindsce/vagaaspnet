using System.Data.Entity.ModelConfiguration;
using TechmindsCRM.Core.Models;

namespace TechmindsCRM.Data.EntityMaps
{
    public class ClienteMap : EntityTypeConfiguration<Cliente>
    {
        public ClienteMap()
        {
            HasKey(e => e.Id);
        }
    }
}
