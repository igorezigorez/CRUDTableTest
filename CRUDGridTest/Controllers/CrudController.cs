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

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Change(CrudItem cruditem)
        {
            if (ModelState.IsValid)
            {
                if (cruditem.Id == 0)
                {
                    Repository.AddCrudItem(cruditem);
                }
                else
                {
                    Repository.UpdateCrudItem(cruditem);
                }
            }
            return new EmptyResult();
        }

        [HttpPost, ActionName("Delete")]
        public ActionResult Delete(int id)
        {
            Repository.DeleteCrudItem(id);
            return new EmptyResult();
        }
    }
}