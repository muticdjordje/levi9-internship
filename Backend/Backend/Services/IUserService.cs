using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface IUserService
    {
        List<User> GetUsersFromFile(string tecnology);

        User FindUser(string username);

        List<User> GetAllUsersFromFile();

        void SaveUserToFile(User user);

        User FindUserFromName(string firstName, string lastName);

    }
}
