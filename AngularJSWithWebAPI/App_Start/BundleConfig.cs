using System.Web;
using System.Web.Optimization;

namespace AngularJSWithWebAPI
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            //Angular
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-cookies.js",
                "~/Scripts/angular-sanitize.js",
                "~/Scripts/angular-route.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            //Bootstrap Angular UI
            bundles.Add(new ScriptBundle("~/bundles/angular-bootstrap").Include(
                "~/Scripts/angular-ui/ui-bootstrap-tpls.js",
                "~/Scripts/angular-ui/ui-utils.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/myangular").Include(
                    "~/app/scripts/disabledhelper/rcSubmit.js",
                    "~/app/scripts/disabledhelper/rcDisabled.js",
                    "~/app/scripts/app.js",
                    "~/app/scripts/services.js",
                    "~/app/scripts/controllers.js"
            ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = true;
        }
    }
}
