namespace TechmindsCRM.Commom.Exceptions
{
    public class CampoObrigatorioException : CRMException
    {
        public CampoObrigatorioException(string nomeCampo, string msg) : base(nomeCampo, msg) { }
    }
}
