using System.Web.Mvc;

namespace TechmindsCRM.Web.Controllers
{
    public class ClienteController : Controller
    {
        // GET: Cliente
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Dados()
        {
            return View();
        }
    }
}