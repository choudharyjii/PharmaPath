using PharmaPath.Data.Domain;
using PharmaPath.Data.Repositories;
using PharmaPath.Service.DataModel;
using System.DirectoryServices;

namespace PharmaPath.Service.Services
{
    public interface ILdapAuthenticatorService
    {
        Task<UserDetailModel?> AuthenticateViaLdap(FilterUserModel userLoginModel);
    }

    public class LdapAuthenticatorService : ILdapAuthenticatorService
    {
        private const string DisplayNameAttribute = "DisplayName";
        private const string SAMAccountNameAttribute = "SAMAccountName";
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;

        public LdapAuthenticatorService(IUserRepository userRepository, IUserService userService)
        {
            _userRepository = userRepository;
            _userService = userService;
        }

        public async Task<UserDetailModel?> AuthenticateViaLdap(FilterUserModel userLoginModel)
        {
            string path = "LDAP://dwddc.barwalefoundation.org:389/DC=barwalefoundation,DC=org";
            try
            {
                using (DirectoryEntry entry = new DirectoryEntry(path, userLoginModel.EmailId, userLoginModel.Password))
                {
                    using (DirectorySearcher searcher = new DirectorySearcher(entry))
                    {
                        searcher.Filter = $"({SAMAccountNameAttribute}={userLoginModel.EmailId})";
                        searcher.PropertiesToLoad.Add(DisplayNameAttribute);
                        searcher.PropertiesToLoad.Add(SAMAccountNameAttribute);

                        var result = searcher.FindOne();
                        if (result != null)
                        {
                            return new UserDetailModel
                            {
                                UserName = result.Properties[DisplayNameAttribute][0].ToString(),
                                UserCode = result.Properties[SAMAccountNameAttribute][0].ToString(),
                                EmailId = result.Properties[SAMAccountNameAttribute][0].ToString()
                            };
                        }
                    }
                }
            }
            catch
            {
                return null;
            }

            return null;
        }

    }
}
