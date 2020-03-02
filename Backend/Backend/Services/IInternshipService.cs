using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface IInternshipService
    {
        void SaveInternshipToFile(Internship internship);

        List<Internship> GetAllInternshipsFromFile();

        List<Internship> GetInternshipsFromFile(int month);

        Internship FindInternship(Internship internship);

        void AddMentorToInternship(User mentor, Internship internship);

        void UpdateInternship(DateTime newDate, Internship internship);
    }
}
