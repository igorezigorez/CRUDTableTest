using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CRUDGridTest.Models;

namespace CRUDGridTest
{
    public class CrudRepository
    {
        
        public IEnumerable<CrudItem> GetCrudList()
        {
            return items;
        }

        public CrudItem GetCrudItem(int id)
        {
            return items.Where(item => item.Id == id).FirstOrDefault();
        }

        public void AddCrudItem(CrudItem item)
        {
            items.Add(item);
        }

        public void DeleteCrudItem(int id)
        {
            items.Remove(items.Where(item => item.Id == id).FirstOrDefault());
        }




        IList<CrudItem> items = new List<CrudItem>()
        {
            new CrudItem()
            {
                Id = 1,
                Name = "item1",
                Description = "item description 1",
                Weight = 1
            },
            new CrudItem()
            {
                Id = 2,
                Name = "item2",
                Description = "item description 2",
                Weight = 2
            },
            new CrudItem()
            {
                Id = 3,
                Name = "item3",
                Description = "item description 3",
                Weight = 3
            }
        };
    }
}