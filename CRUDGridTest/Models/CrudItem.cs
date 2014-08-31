using System.Collections.Generic;

namespace CRUDGridTest.Models
{
    public class CrudItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Weight { get; set; }
        public bool Checked { get; set; }
        public IEnumerable<string> Options { get; set; }
    }
}