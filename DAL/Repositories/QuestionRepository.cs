using DAL.Abstract;
using EntityLib;
using EntityLib.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly BhpContext _dbContext;

        public QuestionRepository(BhpContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Question> GetQuestionAsync(int id)
        {
            return await _dbContext.Questions
                .Where(x => x.Id.Equals(id))
                .FirstOrDefaultAsync();
        }
    }
}
