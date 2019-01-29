using EntityLib.Entities;
using System.Threading.Tasks;

namespace DAL.Abstract
{
    public interface IQuestionRepository
    {
        Task<Question> GetQuestionAsync(int id);
    }
}
