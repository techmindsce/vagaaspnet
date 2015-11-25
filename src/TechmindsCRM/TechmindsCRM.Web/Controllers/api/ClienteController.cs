using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using AutoMapper;
using TechmindsCRM.Commom.Exceptions;
using TechmindsCRM.Core.Interfaces;
using TechmindsCRM.Core.Models;
using TechmindsCRM.Web.OutputModel;
using TechmindsCRM.Web.ViewModels;

namespace TechmindsCRM.Web.Controllers.api
{
    public class ClienteController : ApiController
    {
        private readonly IClienteBO clientesBO;

        public ClienteController(IClienteBO clientesBO)
        {
            this.clientesBO = clientesBO;
        }

        [Route("api/cliente")]
        public GridRequest<Cliente> Get([FromUri]ClienteFiltro gridRequest) => gridRequest.ToResult(clientesBO.Filtrar(gridRequest.Query));

        [Route("api/cliente/{id}")]
        public object Get(long id)
        {
            var cliente = clientesBO.Procurar(id);
            if (cliente == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);
            return cliente;
        }

        [HttpPost, Route("api/cliente")]
        public object Post(ClienteViewModel cliente)
        {
            try
            {
                return clientesBO.Incluir(Mapper.Map<Cliente>(cliente)); ;
            }
            catch (CRMException e)
            {
                throw new HttpResponseException(Request.CreateResponse<ErrorResult>(HttpStatusCode.BadRequest,
                    new ErrorResult(e, "Novo Cliente")));

            }
        }

        [HttpDelete, Route("api/cliente")]
        public object Delete([FromUri]List<long> ids)
        {
            try
            {
                clientesBO.Deletar(ids.ToArray());
                return new OkResult(this);
            }
            catch (CRMException e)
            {
                throw new HttpResponseException(Request.CreateResponse<ErrorResult>(HttpStatusCode.BadRequest,
                    new ErrorResult(e, "Deletar Cliente")));
            }
        }

        [HttpPut, Route("api/cliente")]
        public object Put(ClienteViewModel cliente)
        {
            try
            {
                return clientesBO.Alterar(Mapper.Map<Cliente>(cliente));
            }
            catch (CRMException e)
            {
                throw new HttpResponseException(Request.CreateResponse<ErrorResult>(HttpStatusCode.BadRequest,
                    new ErrorResult(e, "Alterar Cliente")));
            }
        }



    }
}
