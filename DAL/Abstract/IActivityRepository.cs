using EntityLib.Entities;
using System.Threading.Tasks;

namespace DAL.Abstract
{
    public interface IActivityRepository
    {
        Task<Quiz> GetQuizAsync(int id);
        Task<Progress> GetActivityProgressAsync(string userId, int courseId, int activityId);
        Task CompleteActivityAsync(string userId, int courseId, int activityId);
    }
}
