using PharmaPath.Data.Domain;
using System.Collections.Generic;
using System.Net;

namespace PharmaPath.Data.Repositories;

public interface IUserRepository
{
    Task<int> LogUserLogin(int userId, string IpAddress);
    Task<UserDetails?> AuthenticateUser(string userName, string? password = null);
}

public class UserRepository : IUserRepository
{
    private readonly IGenericRepository _repository;
    public UserRepository(IGenericRepository repository)
    {
        _repository = repository;
    }

    public async Task<int> LogUserLogin(int userId, string IpAddress)
    {
        return await _repository.ExecuteSQL<int>($"INSERT INTO UserLoginHistory([UserId], [IPAddress], [LoggedOn]) VALUES({userId}, '{IpAddress}', GETUTCDATE())");
    }
    public async Task<UserDetails?> AuthenticateUser(string userName, string password )
    {
        var results = await _repository.LoadData<UserDetails, dynamic>(storedProcedure: "usp_ValidateAuthenticateUser", new { EmailId = userName, Password = password });
        return results != null ? results.FirstOrDefault() : null;
    }
}
