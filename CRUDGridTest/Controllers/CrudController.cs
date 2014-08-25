using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CRUDGridTest.Models;

namespace CRUDGridTest.Controllers
{
    public class CrudController : Controller
    {
        private CRUDGridTestContext db = new CRUDGridTestContext();
        private CrudRepository repository = new CrudRepository();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Items()
        {
            return Json(repository.GetCrudList());
        }

        //
        // GET: /Crud/Details/5

        public ActionResult Details(int id = 0)
        {
            CrudItem cruditem = repository.GetCrudItem(id);
            if (cruditem == null)
            {
                return HttpNotFound();
            }
            return View(cruditem);
        }

        //
        // GET: /Crud/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Crud/Create

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(CrudItem cruditem)
        {
            if (ModelState.IsValid)
            {
                repository.AddCrudItem(cruditem);
                return RedirectToAction("Index");
            }

            return View(cruditem);
        }

        //
        // GET: /Crud/Edit/5

        public ActionResult Edit(int id = 0)
        {
            CrudItem cruditem = db.CrudItems.Find(id);
            if (cruditem == null)
            {
                return HttpNotFound();
            }
            return View(cruditem);
        }

        //
        // POST: /Crud/Edit/5

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(CrudItem cruditem)
        {
            if (ModelState.IsValid)
            {
                db.Entry(cruditem).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(cruditem);
        }

        //
        // GET: /Crud/Delete/5

        public ActionResult Delete(int id = 0)
        {
            CrudItem cruditem = db.CrudItems.Find(id);
            if (cruditem == null)
            {
                return HttpNotFound();
            }
            return View(cruditem);
        }

        //
        // POST: /Crud/Delete/5

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            CrudItem cruditem = db.CrudItems.Find(id);
            db.CrudItems.Remove(cruditem);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}