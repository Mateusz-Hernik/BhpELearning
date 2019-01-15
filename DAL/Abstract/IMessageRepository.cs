using EntityLib.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Abstract
{
    public interface IMessageRepository
    {
        Task<IEnumerable<Message>> GetAllAsync(string id);
        Task<IEnumerable<Message>> GetAllUnreadAsync(string id);
        Task<int> GetUnreadAmountAsync(string id);
    }
}
