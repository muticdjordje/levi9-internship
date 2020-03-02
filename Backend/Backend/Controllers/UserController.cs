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
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpGet("{tecnology}")]
        public ActionResult Get(string tecnology)
        {
            return Ok(_userService.GetUsersFromFile(tecnology));
        }

        [HttpPost]
        public ActionResult Post(User user)
        {
            _userService.SaveUserToFile(user);
            return Ok();
        }
    }
}