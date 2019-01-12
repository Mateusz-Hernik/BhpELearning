using AutoMapper;
using BhpApp.Helpers;
using BhpApp.Models.JWT;
using BhpApp.Utils;
using BhpApp.Utils.Authentication;
using DAL.Abstract;
using DAL.Repositories;
using EntityLib;
using EntityLib.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace BhpApp
{
    public class Startup
    {
        private readonly IHostingEnvironment hostingEnvironment;

        public Startup(IHostingEnvironment env)
        {
            this.hostingEnvironment = env;

            var configurationBuilder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            Configuration = configurationBuilder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Register AutoMapper - it trawls through your code finding all configuration profiles and registers the IMapper interface to be used in your classes
            services.AddAutoMapper();

            // Forces using low letters in url addres
            services.Configure<RouteOptions>(options => options.LowercaseUrls = true);

            // Register BhpContext
            //services.AddDbContext<BhpContext>(options => options.UseSqlServer(Configuration.GetConnectionString("BhpConn")));
            services.AddDbContext<BhpContext>(options => options.UseSqlServer(Configuration.GetConnectionString("BhpConnHome")));

            // Dependency Injection
            services.AddSingleton<IJwtFactory, JwtFactory>();
            services.AddSingleton<IEmailSender, EmailSender>();
            services.AddScoped<ICourseRepository, CourseRepository>();
            services.Configure<AuthMessageSenderOptions>(Configuration);

            // Register the services related to in the dependency injection
            // We need to tell Identity which classes to use for IdentityUser and IdentityRole
            // Token Provider service generates opaque tokens for account operations (like password reset or email change) and two-factor authentication.
            services.AddIdentity<User, IdentityRole>(config =>
            {
                config.SignIn.RequireConfirmedEmail = true;
                config.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<BhpContext>()
            .AddDefaultTokenProviders();

            // Register and configure JwtIssuerOptions JWT
            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));

            var jwtTokenKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("JwtToken:Key").Value));

            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = new SigningCredentials(jwtTokenKey, SecurityAlgorithms.HmacSha512);
            });

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

                ValidateAudience = true,
                ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = jwtTokenKey,

                RequireExpirationTime = false,
                ValidateLifetime = false,
                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication().AddJwtBearer(options =>
            {
                options.TokenValidationParameters = tokenValidationParameters;
            });

            // api user claim policy
            services.AddAuthorization(options =>
            {
                options.AddPolicy("Student", policy => policy.RequireClaim(Constants.Strings.JwtClaimIdentifiers.Rol, Constants.Strings.JwtClaims.StudentAccess));
                options.AddPolicy("Admin", policy => policy.RequireClaim(Constants.Strings.JwtClaimIdentifiers.Rol, Constants.Strings.JwtClaims.AdminAcess));
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            // Enable Identity authentication
            // The UseAuthentication adds authentication middleware to the request pipeline
            app.UseAuthentication();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc();

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
