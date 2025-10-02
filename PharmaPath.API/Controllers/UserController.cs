using PharmaPath.Service.DataModel;
using PharmaPath.Service.Services;
using Microsoft.AspNetCore.Mvc;

namespace PharmaPath.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILdapAuthenticatorService _ldapAuthenticatorService;
        private readonly ICryptoService _CryptoService;

        /// <summary>
        /// This constructor
        /// </summary>
        /// <param name="logger"></param>
        public UserController(IUserService userService
            , ILdapAuthenticatorService ldapAuthenticatorService
            , ICryptoService cryptoService)
        {
            _userService = userService;
            _ldapAuthenticatorService = ldapAuthenticatorService;
            _CryptoService = cryptoService;
        }
        [HttpPost, Route("authenticate", Name = "AuthenticateUser")]
        public async Task<ActionResult<UserDetailModel>> AuthenticateUser(FilterUserModel userLoginModel)
        {
            var ldapResponse = await _ldapAuthenticatorService.AuthenticateViaLdap(userLoginModel);
            if (ldapResponse != null)
                return Ok(ldapResponse);

            var dbResponse = await _userService.AuthenticateViaDatabase(userLoginModel);
            if (dbResponse != null)
                return Ok(dbResponse);

            return BadRequest("Please check Email ID and Password.");
        }


        /// <summary>
        /// Encrypt Password.
        /// </summary>
        [HttpPost, Route("encrypt", Name = "Encrypt")]
        public async Task<ActionResult> Encrypt(UserCodeDateTokenModel userCodeDateTokenModel)
        {
            if (userCodeDateTokenModel.Token != null)
            {
                var response = await _CryptoService.Encrypt(userCodeDateTokenModel.Token);
                return Ok(response);
            }
            return BadRequest("Invalid Request");
        }

        /// <summary>
        /// Decrypt password.
        /// </summary>
        [HttpPost, Route("decrypt", Name = "Decrypt")]
        public async Task<ActionResult> Decrypt(UserCodeDateTokenModel userCodeDateTokenModel)
        {
            var response = await _CryptoService.Decrypt(userCodeDateTokenModel.Token);
            return Ok(response);
        }
    }
}
