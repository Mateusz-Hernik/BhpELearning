using DAL.Abstract;
using EntityLib;
using EntityLib.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly BhpContext _dbContext;

        public UserRepository(BhpContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> GetUserAsync(string userName)
        {
            return await _dbContext.Users
                .Where(x => x.Email.Equals(userName) && x.EmailConfirmed)
                .FirstOrDefaultAsync();
        }
    }
}
