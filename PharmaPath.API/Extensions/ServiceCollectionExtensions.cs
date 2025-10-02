using System.Reflection;

namespace PharmaPath. API.Extensions
{
    /// <summary>
    /// The service collection extensions
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Register the service classes
        /// </summary>
        /// <param name="services">The service</param>
        /// <param name="lifetime">Life time</param>
        /// <param name="filterType">Filter type</param>
        public static void RegisterServiceClasses(this IServiceCollection services, ServiceLifetime lifetime = ServiceLifetime.Transient, string filterType = "")
        {
            var assemblies = new[] { Assembly.Load("PharmaPath.Service") };
            var allPublicTypes = assemblies.SelectMany(x => x.GetExportedTypes()
              .Where(y => y.IsClass && !y.IsAbstract && !y.IsGenericType && !y.IsNested));

            foreach (var classType in allPublicTypes.Where(p => p.Name.EndsWith(filterType)))
            {
                var interfaces = classType.GetTypeInfo().ImplementedInterfaces;
                foreach (var infc in interfaces.Where(i => i != typeof(IDisposable) && i.IsPublic && !i.IsNested))
                {
                    services.Add(new ServiceDescriptor(infc, classType, lifetime));
                }
            }
        }

        /// <summary>
        /// Register the repository classes
        /// </summary>
        /// <param name="services">The service</param>
        /// <param name="lifetime">Life time</param>
        /// <param name="filterType">Filter type</param>
        public static void RegisterRepositoryClasses(this IServiceCollection services, ServiceLifetime lifetime = ServiceLifetime.Transient, string filterType = "")
        {
            var assemblies = new[] { Assembly.Load("PharmaPath.Data") };
            var allPublicTypes = assemblies.SelectMany(x => x.GetExportedTypes()
              .Where(y => y.IsClass && !y.IsAbstract && !y.IsGenericType && !y.IsNested));

            foreach (var classType in allPublicTypes.Where(p => p.Name.EndsWith(filterType)))
            {
                var interfaces = classType.GetTypeInfo().ImplementedInterfaces;
                foreach (var infc in interfaces.Where(i => i != typeof(IDisposable) && i.IsPublic && !i.IsNested))
                {
                    services.Add(new ServiceDescriptor(infc, classType, lifetime));
                }
            }
        }
    }
}