using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(go4estagio.Startup))]
namespace go4estagio
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
