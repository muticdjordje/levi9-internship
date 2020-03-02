using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Internship
    {
        public Technology Technology { get; set; }
        public User Mentor { get; set; }
        public DateTime Date { get; set; }

    }
}
