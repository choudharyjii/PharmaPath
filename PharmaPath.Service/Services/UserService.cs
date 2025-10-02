using PharmaPath. Data.Domain;
using PharmaPath. Data.Repositories;
using PharmaPath. Service.DataModel;
using PharmaPath. Service.Utility;
using static PharmaPath. Service.Utility.Constants;

namespace PharmaPath. Service.Services;

public interface IUserService
{
    Task<UserDetailModel?> AuthenticateViaDatabase(FilterUserModel userLoginModel);
}
public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UserDetailModel?> AuthenticateViaDatabase(FilterUserModel userLoginModel)
    {
        var dbRecord = await _userRepository.AuthenticateUser(userLoginModel.EmailId, userLoginModel.Password);

        if (dbRecord != null)
        {
            var dbModelRecord = new UserDetailModel
            {
                UserName = dbRecord.UserName,
                UserCode = dbRecord.UserCode,
                EmailId = dbRecord.EmailId
            };

            dbModelRecord = GenericMapper<UserDetails, UserDetailModel>.Map(dbRecord, dbModelRecord);
            return dbModelRecord;
        }

        return null;
    }


}
