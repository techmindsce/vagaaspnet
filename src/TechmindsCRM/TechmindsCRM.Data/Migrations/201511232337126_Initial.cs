namespace TechmindsCRM.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Cliente",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Nome = c.String(),
                        CPFCNPJ = c.String(),
                        Telefones = c.String(),
                        Email = c.String(),
                        CEP = c.String(),
                        Logradouro = c.String(),
                        Complemento = c.String(),
                        Numero = c.Long(nullable: false),
                        Bairro = c.String(),
                        Municipio = c.String(),
                        UF = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Cliente");
        }
    }
}
