using EntityLib.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Abstract
{
    public interface IMessageRepository
    {
        Task<Message> FindAsync(int id);
        Task<IEnumerable<Message>> GetAllAsync(string id);
        Task<IEnumerable<Message>> GetAllUnreadAsync(string id);
        Task<int> GetUnreadAmountAsync(string id);
        Task ChangeUnreadStateAsync(int id);
        Task DeleteMessage(int id);
    }
}
