using EntityLib.Entities;
using System.Threading.Tasks;

namespace DAL.Abstract
{
    public interface IActivityRepository
    {
        Task<Progress> GetActivityProgressAsync(string userId, int courseId, int activityId);
    }
}
