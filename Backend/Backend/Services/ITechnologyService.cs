using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface ITechnologyService
    {
        List<Technology> GetAllTechnologies();

        void SaveTechnologyToFile(Technology technology);

    }
}
