using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class InternshipController : ControllerBase
    {
        private IInternshipService _internshipService;
        private IUserService _userService;

        public InternshipController(IInternshipService internshipService, IUserService userService)
        {
            _internshipService = internshipService;
            _userService = userService;
        }

        [HttpGet("{month}")]
        public ActionResult Get(int month)
        {
            return Ok(_internshipService.GetInternshipsFromFile(month));
        }

        [HttpPut("addMentor/{username}")]
        public ActionResult Put(string username, [FromBody]Internship internship)
        {
            Internship internshipFromFile = _internshipService.FindInternship(internship);

            if (internshipFromFile == null)
                return NotFound();

            User mentor = _userService.FindUser(username);

            if (mentor == null)
                return BadRequest();

            _internshipService.AddMentorToInternship(mentor, internshipFromFile);

            return Ok();

        }

        [HttpPut("updateDate/{newDate}")]
        public ActionResult Update(string newDate, [FromBody]Internship internship)
        {
            Internship internshipFromFile = _internshipService.FindInternship(internship);

            DateTime dateTime = Convert.ToDateTime(newDate);
            _internshipService.UpdateInternship(dateTime, internshipFromFile);

            return Ok();
        }

        [HttpPost]
        public ActionResult Post(Internship internship)
        {
            _internshipService.SaveInternshipToFile(internship);
            return Ok();
        }
    }
}