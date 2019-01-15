using EntityLib.Entities;
using System.Threading.Tasks;

namespace DAL.Abstract
{
    public interface IUserRepository
    {
        Task<User> GetUserAsync(string userName);
    }
}
