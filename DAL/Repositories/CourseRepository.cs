using DAL.Abstract;
using EntityLib;
using EntityLib.Entities;
using Microsoft.EntityFrameworkCore;
using System;
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

        public async Task<IEnumerable<Course>> GetAllAsync()
        {
            return await _dbContext.Courses
                .Where(x => x.IsVisible)
                .ToListAsync();
        }

        public async Task<Course> FindByIdAsync(int id)
        {
            return await _dbContext.Courses
                .Where(x => x.Id.Equals(id))
                .FirstOrDefaultAsync();
        }

        public async Task<Course> GetUserCourseAsync(string userId, int courseId)
        {
            var course = await _dbContext.Courses
                .Include(x => x.Activities)
                .Where(x => x.Id.Equals(courseId) && x.IsVisible
                    && x.UserCourses.Any(uc => uc.UserId.Equals(userId)))
                .FirstOrDefaultAsync();

            course.Activities = course.Activities
                .OrderBy(x => x.Order)
                .ToList();

            return course;
        }

        public async Task<int> GetActiveCourseAmountAsync(string id)
        {
            return await _dbContext.Courses
                .Where(x => x.UserCourses.Any(uc => uc.UserId.Equals(id) && uc.IsPaid && uc.IsActive)
                    && x.IsVisible && x.StartDate <= DateTime.Now && x.EndDate >= DateTime.Now)
                .CountAsync();
        }

        public async Task<IEnumerable<Course>> GetIncomingCourses(string id)
        {
            return await _dbContext.Courses
                .Where(x => x.UserCourses.Any(uc => uc.UserId.Equals(id) && uc.IsPaid)
                    && x.IsVisible && x.StartDate > DateTime.Now)
                .ToListAsync();
        }

        public async Task<IEnumerable<Course>> GetActiveCourses(string id)
        {
            return await _dbContext.Courses
                .Where(x => x.UserCourses.Any(uc => uc.UserId.Equals(id) && uc.IsPaid && uc.IsActive)
                    && x.IsVisible && x.StartDate <= DateTime.Now && x.EndDate >= DateTime.Now)
                .ToListAsync();
        }

        public async Task<IEnumerable<Course>> GetExpiredCourses(string id)
        {
            return await _dbContext.Courses
                .Where(x => x.UserCourses.Any(uc => uc.UserId.Equals(id) && uc.IsPaid)
                    && x.EndDate < DateTime.Now)
                .ToListAsync();
        }
    }
}
