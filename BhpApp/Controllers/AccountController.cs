using AutoMapper;
using BhpApp.Controllers.Base;
using BhpApp.Helpers;
using BhpApp.Models.AccountViewModels;
using EntityLib.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BhpApp.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : BaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IEmailSender _emailSender;

        public AccountController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IEmailSender emailSender,
            IMapper mapper) : base(mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel newUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _mapper.Map<User>(newUser);
            var result = await _userManager.CreateAsync(user, newUser.Password);

            if (!result.Succeeded)
            {
                return BadRequest(Errors.AddErrorsToModelState(result, ModelState, newUser.Email));
            }

            //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            //var callbackUrl = string.Format("https://localhost:44309/api/account/confirm?userId={0}&code={1}", user.Id, code);

            //await _emailSender.SendEmailAsync(
            //    newUser.Email, 
            //    "Potwierdzenie rejestracji w serwisie bhpelearning",
            //    $"Proszę potwierdzić rejestrację konta w serwisie bhpelearning <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>klikając w ten link</a>.");

            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok();
        }

        [HttpGet("confirm")]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userName, string code)
           {
            if(string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(code))
            {
                return NotFound();
            }

            var user = _userManager.FindByEmailAsync(userName);
            if(user == null)
            {
                return NotFound();
            }

            var result = await _userManager.ConfirmEmailAsync(user.Result, code);

            if (!result.Succeeded) return BadRequest();

            return Ok();
        }
    }
}
