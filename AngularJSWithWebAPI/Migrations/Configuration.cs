namespace AngularJSWithWebAPI.Migrations
{
    using AngularJSWithWebAPI.Models;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<AngularJSWithWebAPI.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(AngularJSWithWebAPI.Models.ApplicationDbContext context)
        {
            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);
            var user = new ApplicationUser { UserName = "sallen" };

            userManager.Create(new ApplicationUser
            {
                Email = "test@test.com",
                SomeCustomColumn = "Peanut Butter",
                UserName = "Admin"                
            }, "abc123");
        }
    }
}
