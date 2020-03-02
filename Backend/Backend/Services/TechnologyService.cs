using Backend.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class TechnologyService : ITechnologyService
    {
        string pathTechnologies = "../Technologies";

        public List<Technology> GetAllTechnologies()
        {
            List<Technology> technologies = JsonConvert.DeserializeObject<List<Technology>>(File.ReadAllText(pathTechnologies));

            return technologies;
        }

        public void SaveTechnologyToFile(Technology technology)
        {
            List<Technology> technologies = GetAllTechnologies();
            technologies.Add(technology);

            File.WriteAllText(pathTechnologies, JsonConvert.SerializeObject(technologies));
        }
    }
}
