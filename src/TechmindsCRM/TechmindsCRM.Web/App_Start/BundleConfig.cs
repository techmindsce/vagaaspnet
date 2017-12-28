using System;
using System.Web.Optimization;
namespace TechmindsCRM.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            AddDefaultIgnorePatterns(bundles.IgnoreList);

            bundles.Add(
              new ScriptBundle("~/Scripts/vendor")
                  .Include("~/Assets/Scripts/vendor/jquery.min.js")
                  .Include("~/Assets/Scripts/vendor/bootstrap.min.js")
                  .Include("~/Assets/Scripts/vendor/knockout.js")
                  .Include("~/Assets/Scripts/vendor/toastr.min.js")
                  .Include("~/Assets/Scripts/vendor/jquery.slimscroll.min.js")
                  .Include("~/Assets/Scripts/vendor/app.min.js")

              );
            bundles.Add(
          new ScriptBundle("~/Scripts/App")
              .Include("~/Assets/Scripts/app.bundled.js")
             );

            bundles.Add(
              new StyleBundle("~/Assets/Style/vendor/_css")
                .Include("~/Assets/Style/app.css")
                .Include("~/Assets/Style/vendor/css/toastr.min.css")
                .Include("~/Assets/Style/vendor/css/bootstrap.min.css")
                .Include("~/Assets/Style/vendor/css/durandal.css")
                .Include("~/Assets/Style/vendor/css/AdminLTE.min.css")
                .Include("~/Assets/Style/vendor/css/_all-skins.min.css")
              );
        }

        public static void AddDefaultIgnorePatterns(IgnoreList ignoreList)
        {
            if (ignoreList == null)
            {
                throw new ArgumentNullException("ignoreList");
            }

            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");
            ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
            //ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
            //ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
        }
    }
}