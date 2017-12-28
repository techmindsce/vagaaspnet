using System.Linq;
using System.Reflection;
using AutoMapper;
using Ninject;
using WebGrease.Css.Extensions;

namespace TechmindsCRM.Web.App_Start
{
    public static class MapasConfig
    {

        public static void RegisterProfiles()
        {
            var profiles = Assembly.GetAssembly(typeof(MapasConfig)).GetTypes().Where(t => t.BaseType == typeof(Profile));
            profiles.ForEach(profile => Mapper.AddProfile(NinjectWebCommon.bootstrapper.Kernel.Get(profile) as Profile));
        }
    }
}