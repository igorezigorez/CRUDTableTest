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
        private CrudRepository Repository
        {
            get
            {
                if (Session["CrudRepository"] == null) Session["CrudRepository"] = new CrudRepository();
                return (CrudRepository)Session["CrudRepository"];
            }
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Items()
        {
            return Json(Repository.GetCrudList());
        }

        public ActionResult Details(int id = 0)
        {
            CrudItem cruditem = Repository.GetCrudItem(id);
            if (cruditem == null)
            {
                return HttpNotFound();
            }
            return View(cruditem);
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(CrudItem cruditem)
        {
            if (ModelState.IsValid)
            {
                Repository.AddCrudItem(cruditem);
                return RedirectToAction("Index");
            }

            return View(cruditem);
        }

        public ActionResult Edit(int id = 0)
        {
            CrudItem cruditem = Repository.GetCrudItem(id);
            if (cruditem == null)
            {
                return HttpNotFound();
            }
            return View(cruditem);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(CrudItem cruditem)
        {
            if (ModelState.IsValid)
            {
                Repository.UpdateCrudItem(cruditem);
                return RedirectToAction("Index");
            }
            return View(cruditem);
        }

        public ActionResult Delete(int id = 0)
        {
            CrudItem cruditem = Repository.GetCrudItem(id);
            if (cruditem == null)
            {
                return HttpNotFound();
            }
            return View(cruditem);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Repository.DeleteCrudItem(id);
            return RedirectToAction("Index");
        }
    }
}