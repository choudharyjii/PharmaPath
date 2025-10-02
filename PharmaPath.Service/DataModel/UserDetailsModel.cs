using PharmaPath.Data.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
namespace PharmaPath. Service.DataModel
{
    public class UserDetailModel: UserDetails
    {
       
    }

    public class FilterUserModel
    {
        public string Password { get; set; } = string.Empty;
        public string EmailId { get; set; } = string.Empty;
    }

    public class UserLoginModel
    {
        public string EmailId { get; set;}
        public string? Password { get; set;}
        public string? IpAddress { get; set;}
        public byte AuthenticationType { get; set;}
    }
    public class UserCodeDateTokenModel
    {
        public string Token { get; set;} 
    }
}
