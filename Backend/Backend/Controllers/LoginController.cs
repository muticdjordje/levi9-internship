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
    public class LoginController : ControllerBase
    {
        private IUserService _userService;

        public LoginController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{username}", Name = "Get")]
        public ActionResult Get(string username)
        {
            User user = _userService.FindUser(username);

            if (user != null)
                return Ok(user);
            else
                return NotFound();
        }
    }
}