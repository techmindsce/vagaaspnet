using AutoMapper;
using TechmindsCRM.Core.Models;
using TechmindsCRM.Web.ViewModels;

namespace TechmindsCRM.Web.Mapas
{
    public class ClienteProfile : Profile
    {
        protected override void Configure()
        {
            Mapper.CreateMap<ClienteViewModel, Cliente>();
            Mapper.CreateMap<Cliente, ClienteViewModel>();
            base.Configure();
        }
    }
}