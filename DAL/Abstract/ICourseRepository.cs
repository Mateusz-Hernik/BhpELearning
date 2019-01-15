using EntityLib.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Abstract
{
    public interface ICourseRepository
    {
        Task<IEnumerable<Course>> GetAllAsync();
        Task<Course> FindByIdAsync(int id);
        Task<int> GetActiveCourseAmountAsync(string id);
    }
}
