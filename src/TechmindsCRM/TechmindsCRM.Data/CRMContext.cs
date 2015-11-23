using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using TechmindsCRM.Data.Migrations;

namespace TechmindsCRM.Data
{
    public class CRMContext : DbContext
    {
        public CRMContext() : base("CrmConnStr")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<CRMContext, Configuration>());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.AddFromAssembly(typeof(CRMContext).Assembly);

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();


            base.OnModelCreating(modelBuilder);
        }

    }
}
