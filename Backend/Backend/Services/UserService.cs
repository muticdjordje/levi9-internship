using Backend.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        string pathUsers = "../Users";

        public User FindUser(string username)
        {
            List<User> users = GetAllUsersFromFile();

            return users.Where(x => x.Username.Equals(username)).FirstOrDefault();
        }

        public List<User> GetAllUsersFromFile()
        {
            List<User> users = new List<User>();

            users = JsonConvert.DeserializeObject<List<User>>(File.ReadAllText(pathUsers));

            return users;
        }

        public List<User> GetUsersFromFile(string tecnology)
        {
            List<User> users = new List<User>();

            users = JsonConvert.DeserializeObject<List<User>>(File.ReadAllText(pathUsers));

            return users.Where(x => x.Technology.Name != null && x.Technology.Name.ToUpper().Equals(tecnology.ToUpper())).ToList();
        }

        public void SaveUserToFile(User user)
        {
            List<User> users = GetAllUsersFromFile();
            users.Add(user);

            File.WriteAllText(pathUsers, JsonConvert.SerializeObject(users));
        }
        public User FindUserFromName(string firstName, string lastName)
        {
            List<User> users = GetAllUsersFromFile();

            return users.Where(x => x.FirstName.Equals(firstName) && x.LastName.Equals(lastName)).FirstOrDefault();
        }
    }
}
