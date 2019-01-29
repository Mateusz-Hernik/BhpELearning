using DAL.Abstract;
using EntityLib;
using EntityLib.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly BhpContext _dbContext;

        public MessageRepository(BhpContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Message> FindAsync(int id)
        {
            return await _dbContext.Messages
                .Where(x => x.Id.Equals(id))
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Message>> GetAllAsync(string id)
        {
            return await _dbContext.Messages
                .Where(x => x.User.Id.Equals(id))
                .OrderByDescending(x => x.SendDate)
                .ToListAsync();
        }

        public async Task<IEnumerable<Message>> GetAllUnreadAsync(string id)
        {
            return await _dbContext.Messages
                .Where(x => x.User.Id.Equals(id) && !x.IsRead)
                .OrderByDescending(x => x.SendDate)
                .ToListAsync();
        }

        public async Task<int> GetUnreadAmountAsync(string id)
        {
            return await _dbContext.Messages
                .Where(x => x.User.Id.Equals(id) && !x.IsRead)
                .CountAsync();
        }

        public async Task ChangeUnreadStateAsync(int id)
        {
            var message = await FindAsync(id);

            if (message != null && !message.IsRead)
            {
                message.IsRead = true;

                _dbContext.Messages.Update(message);

                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task DeleteMessage(int id)
        {
            var message = await FindAsync(id);

            if (message != null)
            {
                _dbContext.Messages.Remove(message);

                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task SendMessageAsync(Message message)
        {
            await _dbContext.Messages.AddAsync(message);
            await _dbContext.SaveChangesAsync();
        }
    }
}
