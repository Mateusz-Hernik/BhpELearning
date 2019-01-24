using DAL.Abstract;
using EntityLib;
using EntityLib.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class ActivityRepository : IActivityRepository
    {
        private readonly BhpContext _dbContext;

        public ActivityRepository(BhpContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Progress> GetActivityProgressAsync(string userId, int courseId, int activityId)
        {
            return await _dbContext.Progresses
                .Where(x => x.UserId.Equals(userId) && x.CourseId.Equals(courseId) && x.ActivityId.Equals(activityId))
                .FirstOrDefaultAsync();
        }
    }
}
