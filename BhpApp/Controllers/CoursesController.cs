﻿using AutoMapper;
using BhpApp.Controllers.Base;
using DAL.Abstract;
using DTO;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BhpApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CoursesController : BaseController
    {
        private readonly ICourseRepository _courseRepository;

        public CoursesController(
            ICourseRepository courseRepository,
            IMapper mapper) : base(mapper)
        {
            _courseRepository = courseRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var courses = await _courseRepository.GetAllAsync();

            var coursesDto = _mapper.Map<IEnumerable<CourseDto>>(courses);

            return Ok(coursesDto);
        }

        [HttpGet("getnavcourses")]
        public async Task<IActionResult> GetAllForNav()
        {
            var courses = await _courseRepository.GetAllAsync();

            var coursesNavDto = _mapper.Map<IEnumerable<CourseNavDto>>(courses);

            return Ok(coursesNavDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var course = await _courseRepository.FindByIdAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            var courseInfoDto = _mapper.Map<CourseInfoDto>(course);

            return Ok(courseInfoDto);           
        }
    }
}
