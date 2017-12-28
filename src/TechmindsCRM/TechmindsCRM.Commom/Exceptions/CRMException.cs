using System;
using System.Collections.Generic;

namespace TechmindsCRM.Commom.Exceptions
{
    public class CRMException : Exception
    {
        public CRMException() { }

        public CRMException(string msg, Exception inner = null)
            : base(msg, inner)
        { }

        public CRMException(string title, string msg, Exception inner = null) : base(msg, inner)
        {
            Erros = new Dictionary<string, string> { { title, msg } };
        }

        public Dictionary<string, string> Erros { get; }
    }
}
