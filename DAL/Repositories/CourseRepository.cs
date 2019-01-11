using DAL.Abstract;
using EntityLib;
using EntityLib.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly BhpContext _dbContext;

        public CourseRepository(BhpContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Course>> GetAll()
        {
            return await _dbContext.Courses.Where(x => x.IsVisible).ToListAsync();
        }

        public async Task<Course> FindById(int id)
        {
            return await _dbContext.Courses.Where(x => x.Id == id).FirstOrDefaultAsync();
        }
    }
}
