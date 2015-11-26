using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using AgendaDeClientes.DAL;
using AgendaDeClientes.Models;
using PagedList;

namespace AgendaDeClientes.Controllers
{
    public class ClientesController : Controller
    {
        private ClienteContext db = new ClienteContext();

        // GET: Clientes
        public ActionResult Index(string sortOrder, string currentFilter, string searchString, int? page)
        {
            ViewBag.CurrentSort = sortOrder;
            ViewBag.NomeParam = String.IsNullOrEmpty(sortOrder) ? "Nome_Desc" : "";
            ViewBag.DateParam = sortOrder == "Date" ? "Date_Desc" : "Date";

            if(searchString != null)
            {
                page = 1;
            }
            else
            {
                searchString = currentFilter;
            }

            ViewBag.CurrentFilter = searchString;

            var clientes = from s in db.tbClientes select s;

            if (!String.IsNullOrEmpty(searchString))
            {
                clientes = clientes.Where(s => s.Nome.ToUpper().Contains(searchString.ToUpper()) 
                || s.Telefone.ToUpper().Contains(searchString.ToUpper()) 
                || s.Endereco.ToUpper().Contains(searchString.ToUpper()));
            }

            switch(sortOrder)
            {
                case "Nome_Desc":
                    clientes = clientes.OrderByDescending(s => s.Nome);
                    break;
                case "Date":
                    clientes = clientes.OrderBy(s => s.DataNascimento);
                    break;
                case "Data_Desc":
                    clientes = clientes.OrderByDescending(s => s.DataNascimento);
                    break;
                default:
                    clientes = clientes.OrderBy(s => s.Nome);
                    break;
            }

            int pageSize = 5;
            int pageNumber = (page ?? 1);

            return View(clientes.ToPagedList(pageNumber, pageSize));
        }

        // GET: Clientes/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Cliente cliente = db.tbClientes.Find(id);
            if (cliente == null)
            {
                return HttpNotFound();
            }
            return View(cliente);
        }

        // GET: Clientes/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Clientes/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ClienteID,Nome,Email,DataNascimento,Telefone,Endereco")] Cliente cliente)
        {
            if (ModelState.IsValid)
            {
                db.tbClientes.Add(cliente);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(cliente);
        }

        // GET: Clientes/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Cliente cliente = db.tbClientes.Find(id);
            if (cliente == null)
            {
                return HttpNotFound();
            }
            return View(cliente);
        }

        // POST: Clientes/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ClienteID,Nome,Email,DataNascimento,Telefone,Endereco")] Cliente cliente)
        {
            if (ModelState.IsValid)
            {
                db.Entry(cliente).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(cliente);
        }

        // GET: Clientes/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Cliente cliente = db.tbClientes.Find(id);
            if (cliente == null)
            {
                return HttpNotFound();
            }
            return View(cliente);
        }

        // POST: Clientes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Cliente cliente = db.tbClientes.Find(id);
            db.tbClientes.Remove(cliente);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
