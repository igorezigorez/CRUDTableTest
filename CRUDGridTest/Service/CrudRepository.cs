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
            return items.FirstOrDefault(item => item.Id == id);
        }

        public void AddCrudItem(CrudItem item)
        {
            items.Add(item);
        }

        public void DeleteCrudItem(int id)
        {
            items.Remove(items.FirstOrDefault(item => item.Id == id));
        }

        public void UpdateCrudItem(CrudItem item)
        {
            var old = items.FirstOrDefault(oldItem => oldItem.Id == item.Id);

            old.Description = item.Description;
            old.Weight = item.Weight;
            old.Name = item.Name;
            
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
            },
            new CrudItem()
            {
                Id = 4,
                Name = "item4",
                Description = "item description 4",
                Weight = 4
            },
            new CrudItem()
            {
                Id = 5,
                Name = "item5",
                Description = "item description 5",
                Weight = 5
            },
            new CrudItem()
            {
                Id = 6,
                Name = "item6",
                Description = "item description 6",
                Weight = 6
            }
        };
    }
}