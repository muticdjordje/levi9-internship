using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Newtonsoft.Json;

namespace Backend.Services
{
    public class InternshipService : IInternshipService
    {
        string pathInternships = "../Internships";
        public List<Internship> GetAllInternshipsFromFile()
        {
            List<Internship> internships = new List<Internship>();

            internships = JsonConvert.DeserializeObject<List<Internship>>(File.ReadAllText(pathInternships));

            return internships;
        }

        public List<Internship> GetInternshipsFromFile(int month)
        {
            List<Internship> internships = new List<Internship>();

            internships = JsonConvert.DeserializeObject<List<Internship>>(File.ReadAllText(pathInternships));

            return internships.Where(x => x.Date.Month == month).ToList();
        }

        public void SaveInternshipToFile(Internship internship)
        {
            List<Internship> internships = GetAllInternshipsFromFile();
            internships.Add(internship);

            File.WriteAllText(pathInternships, JsonConvert.SerializeObject(internships));
        }

        public Internship FindInternship(Internship internship)
        {
            List<Internship> internships = GetAllInternshipsFromFile();

            return internships.Where(x => x.Date == internship.Date && x.Technology.Name.Equals(internship.Technology.Name)).FirstOrDefault();
        }

        public void AddMentorToInternship(User mentor, Internship internship)
        {
            List<Internship> internships = GetAllInternshipsFromFile();

            Internship oldInternship = internships.Where(x => x.Date == internship.Date && x.Technology.Name == internship.Technology.Name).FirstOrDefault();

            if (oldInternship != null)
            {
                oldInternship.Mentor = mentor;
                File.WriteAllText(pathInternships, String.Empty);
                File.WriteAllText(pathInternships, JsonConvert.SerializeObject(internships));
            }
        }

        public void UpdateInternship(DateTime newDate, Internship internship)
        {
            List<Internship> internships = GetAllInternshipsFromFile();

            Internship oldInternship = internships.Where(x => x.Date == internship.Date && x.Technology.Name == internship.Technology.Name).FirstOrDefault();

            if (oldInternship != null)
            {
                int index = internships.IndexOf(oldInternship);
                internships[index].Date = newDate;
                File.WriteAllText(pathInternships, JsonConvert.SerializeObject(internships));
            }
        }
    }
}
