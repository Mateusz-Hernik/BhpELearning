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

        public async Task<IEnumerable<Message>> GetAllAsync(string id)
        {
            return await _dbContext.Messages
                .Where(x => x.User.Id.Equals(id))
                .ToListAsync();
        }

        public async Task<IEnumerable<Message>> GetAllUnreadAsync(string id)
        {
            return await _dbContext.Messages
                .Where(x => x.User.Id.Equals(id) && !x.IsRead)
                .ToListAsync();
        }

        public async Task<int> GetUnreadAmountAsync(string id)
        {
            return await _dbContext.Messages
                .Where(x => x.User.Id.Equals(id) && !x.IsRead)
                .CountAsync();
        }
    }
}
