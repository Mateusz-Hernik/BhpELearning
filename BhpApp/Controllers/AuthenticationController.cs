﻿using BhpApp.Helpers;
using BhpApp.Models.AccountViewModels;
using BhpApp.Models.JWT;
using BhpApp.Utils.Authentication;
using EntityLib.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BhpApp.Controllers
{
    [Route("api/auth")]
    public class AuthenticationController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IJwtFactory _jwtFactory;       
        private readonly JwtIssuerOptions _jwtOptions;

        public AuthenticationController(
            UserManager<User> userManager, 
            IJwtFactory jwtFactory, 
            IOptions<JwtIssuerOptions> jwtOptions)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
        }

        // POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody]LoginViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(credentials.Email, credentials.Password);
            if (identity == null)
            {
                return BadRequest(Errors.AddErrorToModelState("errors", "Nieprawidłowa nazwa użytkownika lub hasło!", ModelState));
            }

            // Serialize and return the response
            var response = new
            {
                user_name = credentials.Email,
                auth_token = await _jwtFactory.GenerateEncodedToken(credentials.Email, identity),
                expires_in = (int)_jwtOptions.ValidFor.TotalSeconds
            };

            return Ok(response);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string login, string password)
        {
            if (!string.IsNullOrEmpty(login) && !string.IsNullOrEmpty(password))
            {
                // get the user to verifty
                var userToVerify = await _userManager.FindByNameAsync(login);

                if (userToVerify != null)
                {
                    // check the credentials  
                    if (await _userManager.CheckPasswordAsync(userToVerify, password))
                    {
                        return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(login, userToVerify.Id));
                    }
                }
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}
