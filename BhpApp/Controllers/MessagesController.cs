using AutoMapper;
using BhpApp.Controllers.Base;
using BhpApp.Helpers;
using DAL.Abstract;
using DTO;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BhpApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MessagesController : BaseController
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;

        public MessagesController(
            IMessageRepository messageRepository,
            IUserRepository userRepository,
            IMapper mapper) : base(mapper)
        {
            _messageRepository = messageRepository;
            _userRepository = userRepository;
        }

        [HttpGet("all/{email}")]
        public async Task<IActionResult> Get(string email)
        {
            var user = await _userRepository.GetUserAsync(email);

            if (user == null)
            {
                return NotFound();
            }

            var messagesDto = _mapper.Map<IEnumerable<MessageDto>>(await _messageRepository.GetAllAsync(user.Id));

            return Ok(messagesDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var message = await _messageRepository.FindAsync(id);

            if (message == null)
            {
                return NotFound();
            }

            var messageDto = _mapper.Map<MessageDto>(message);

            return Ok(messageDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _messageRepository.DeleteMessage(id);
            }
            catch (Exception ex)
            {
                // TODO dodać loggera
                return BadRequest(Errors.AddErrorToModelState("errors", "Wystąpił błąd podczas przetwarzania żądania. Proszę wykonać akcję jeszcze raz", ModelState));
            }

            return Ok();
        }

        [HttpGet("changestatus/{id}")]
        public async Task<IActionResult> ChangeStatus(int id)
        {
            try
            {
                await _messageRepository.ChangeUnreadStateAsync(id);
            }
            catch (Exception ex)
            {
                // TODO dodać loggera
                return BadRequest(Errors.AddErrorToModelState("errors", "Wystąpił błąd podczas przetwarzania żądania. Proszę wykonać akcję jeszcze raz" , ModelState));
            }           

            return Ok();
        }
    }
}
