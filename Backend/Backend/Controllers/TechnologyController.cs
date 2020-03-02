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
    public class TechnologyController : ControllerBase
    {
        private ITechnologyService _technologyService;

        public TechnologyController(ITechnologyService technologyService)
        {
            _technologyService = technologyService;
        }


        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_technologyService.GetAllTechnologies());
        }

        [HttpPost]
        public ActionResult Post(Technology technology)
        {
            _technologyService.SaveTechnologyToFile(technology);
            return Ok();
        }
    }
}