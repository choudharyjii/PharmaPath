using AspNetCoreRateLimit;
using GoogleApi.Extensions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using NLog.Extensions.Logging;
using PharmaPath.API.Extensions;
using PharmaPath.Data;
using System;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        var builder = WebApplication.CreateBuilder(args);
        var configuration = builder.Configuration;
// Program.cs (or Startup.cs)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

// Add services to the container.
builder.Services.AddControllers()
.ConfigureApiBehaviorOptions(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

// Add MemoryCache service for rate limit counters
builder.Services.AddMemoryCache();
        
        // Configure AspNetCoreRateLimit services
        builder.Services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
        builder.Services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();
        builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
        builder.Services.AddInMemoryRateLimiting();
        builder.Services.Configure<IpRateLimitOptions>(builder.Configuration.GetSection("IpRateLimiting"));
        
        
        builder.Services.AddAuthentication(AzureADDefaults.JwtBearerAuthenticationScheme)
            .AddAzureADBearer(configureOptions: options => configuration.Bind("AzureAd", options));

        // The following flag can be used to get more descriptive errors in development environments
        IdentityModelEventSource.ShowPII = false;

        builder.Services.AddGoogleApiClients();

// Add services and repository dependency
ConfigureServices(builder.Services);

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        //builder.Services.AddScoped<ErrorHandlingMiddleware>();
        builder.Services.AddLogging(loggingBuilder =>
        {
            loggingBuilder.ClearProviders();
            loggingBuilder.AddNLog();
        });
        var app = builder.Build();
        app.UseMiddleware<ErrorHandlingMiddleware>();

// MySQL connection setup
var connectionString = builder.Configuration.GetConnectionString("MySqlConnection");

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}
//else
//{
//    app.UseDefaultFiles();
//    app.UseStaticFiles();
//}

app.UseSwagger();
        app.UseSwaggerUI();
        app.UseDefaultFiles();
        app.UseStaticFiles();

        app.UseHttpsRedirection();

        app.UseAuthentication();


        //Enable Rate Limiting Middleware
        app.UseIpRateLimiting();
        
        
        app.MapControllers();
        
        //Enable Cors Origins
        app.UseCors(MyAllowSpecificOrigins);

        app.Run();

        void ConfigureServices(IServiceCollection services)
        {
            services
            .AddSingleton<DapperContext>();

            services.RegisterRepositoryClasses(ServiceLifetime.Transient, "Repository");
            services.RegisterServiceClasses(ServiceLifetime.Transient, "Service");

        }
