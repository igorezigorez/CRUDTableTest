using CRUDGridTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRUDGridTest.Controllers
{
    public class CrudTableController : Controller
    {
        private CrudRepository repository;
        private CrudRepository Repository
        {
            get { return repository ?? (repository = new CrudRepository()); }
        }

        //
        // GET: /CrudTable/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult List()
        {
            var items = Repository.GetCrudList();
            return Json(items);
        }

        //
        // GET: /CrudTable/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /CrudTable/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /CrudTable/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /CrudTable/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /CrudTable/Edit/5

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(CrudItem crudItem)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /CrudTable/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /CrudTable/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
