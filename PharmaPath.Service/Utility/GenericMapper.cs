namespace PharmaPath. Service.Utility
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.Reflection;

    /// <summary>
    /// This class provides methods for object-object mapping.
    /// All the methods except source and target objects.
    /// These methods are useful for mapping data model object to view model object.
    /// </summary>
    /// <typeparam name="TSource">Source Type</typeparam>
    /// <typeparam name="TTarget">Target Type</typeparam>
    public static class GenericMapper<TSource, TTarget>
    {
        /// <summary>
        /// Maps source object of type T to target object of type K
        /// </summary>
        /// <param name="source">Source object</param>
        /// <param name="target">Target object</param>
        /// <returns>Updated target object</returns>
        public static TTarget Map(TSource source, TTarget target)
        {
            // Get array of properties from source and target objects
            PropertyInfo[] sourceProperties = typeof(TSource).GetProperties();
            PropertyInfo[] targetProperties = typeof(TTarget).GetProperties();

            if (source != null)
            {
                // Loop through source object's properties
                foreach (var sourceProperty in sourceProperties)
                {
                    // Get property of target object with the same name as source
                    var properties = from p in targetProperties
                                     where p.Name.Equals(sourceProperty.Name) && !p.DeclaringType.Name.Contains("PropertyInfo")
                                     select p;
                    if (properties.Count() > 0)
                    {
                        // Set target object property
                        try
                        {
                            properties.FirstOrDefault().SetValue(target, sourceProperty.GetValue(source));
                        }
                        catch
                        {
                            // No need to log this exception. Suppress this.
                        }
                    }
                }
            }

            return target;
        }

        /// <summary>
        /// Maps source collection object of type T to target collection object of type K
        /// </summary>
        /// <param name="sourceCollection">Source collection</param>
        /// <param name="targetCollection">Target collection</param>
        /// <returns>List of object</returns>
        public static Collection<TTarget> MapCollection(Collection<TSource> sourceCollection, Collection<TTarget> targetCollection)
        {
            // Get array of properties from source and target objects
            PropertyInfo[] sourceProperties = typeof(TSource).GetProperties();
            PropertyInfo[] targetProperties = typeof(TTarget).GetProperties();
            targetCollection = new Collection<TTarget>();
            if (sourceCollection != null)
            {
                // Loop through each object in collection
                foreach (var sourceItem in sourceCollection)
                {
                    var newItem = Activator.CreateInstance<TTarget>();
                    ////Loop through source object's properties
                    foreach (var sourceProperty in sourceProperties)
                    {
                        // Get property of target object with the same name as source
                        var properties = from p in targetProperties
                                         where p.Name.Equals(sourceProperty.Name) && !p.DeclaringType.Name.Contains("PropertyInfo")
                                         && p.CanWrite == true // We cant set property which is only get
                                         select p;
                        if (properties.Count() > 0)
                        {
                            // Set target object property
                            properties.FirstOrDefault().SetValue(newItem, sourceProperty.GetValue(sourceItem));
                        }
                    }

                    // Add item to collection
                    targetCollection.Add(newItem);
                }
            }

            return targetCollection;
        }

        /// <summary>
        /// Maps the generic collection.
        /// </summary>
        /// <param name="sourceCollection">The source collection.</param>
        /// <param name="targetCollection">The target collection.</param>
        /// <returns>list of target collection</returns>
        public static List<TTarget> MapGenericCollection(List<TSource> sourceCollection, List<TTarget> targetCollection)
        {
            return MapCollection(sourceCollection, targetCollection);
        }

        /// <summary>
        /// Maps the generic collection.
        /// </summary>
        /// <param name="sourceCollection">The source collection.</param>
        /// <param name="targetCollection">The target collection.</param>
        /// <returns>list of target collection</returns>
        public static List<TTarget> MapGenericCollection(Collection<TSource> sourceCollection, List<TTarget> targetCollection)
        {
            return MapCollection(sourceCollection, targetCollection);
        }

        /// <summary>
        /// Maps the collection.
        /// </summary>
        /// <param name="sourceCollection">The source collection.</param>
        /// <param name="targetCollection">The target collection.</param>
        /// <returns>Mapped target collection.</returns>
        private static List<TTarget> MapCollection(IEnumerable<TSource> sourceCollection, List<TTarget> targetCollection)
        {
            // Get array of properties from source and target objects
            PropertyInfo[] sourceProperties = typeof(TSource).GetProperties();
            PropertyInfo[] targetProperties = typeof(TTarget).GetProperties();
            targetCollection = new List<TTarget>();
            if (sourceCollection != null)
            {
                // Loop through each object in collection
                foreach (var sourceItem in sourceCollection)
                {
                    var newItem = Activator.CreateInstance<TTarget>();
                    ////Loop through source object's properties
                    foreach (var sourceProperty in sourceProperties)
                    {
                        // Get property of target object with the same name as source
                        var properties = from p in targetProperties
                                         where p.Name.Equals(sourceProperty.Name) && !p.DeclaringType.Name.Contains("PropertyInfo")
                                         select p;
                        if (!string.IsNullOrWhiteSpace(sourceProperty.PropertyType.FullName) && !sourceProperty.PropertyType.FullName.StartsWith("System.Collections") && properties.Count() > 0)
                        {
                            // Set target object property
                            properties.FirstOrDefault().SetValue(newItem, sourceProperty.GetValue(sourceItem));
                        }
                    }

                    // Add item to collection
                    targetCollection.Add(newItem);
                }
            }

            return targetCollection;
        }
    }
}
