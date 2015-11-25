using System.Linq;
using System.Text.RegularExpressions;

namespace TechmindsCRM.Commom.Extensions
{
    public static class StringExtensions
    {

        public static bool CpfCnpjValido(this string cpfcnpj)
        {
            cpfcnpj = cpfcnpj.SomenteNumeros();

            if (cpfcnpj.Length == 14)
                return cpfcnpj.IsCnpj();

            return cpfcnpj.Length == 11 && cpfcnpj.IsCpf();
        }

        private static bool IsCpf(this string cpf)
        {
            var multiplicador1 = new int[9] { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            var multiplicador2 = new int[10] { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            cpf = cpf.Trim();
            var cpfSub = cpf.Substring(0, 9);
            var soma = cpfSub.Zip(multiplicador1, (dig, mult) => int.Parse(dig.ToString()) * mult).Sum();

            var resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            var digito = resto.ToString();
            cpfSub = cpfSub + digito;
            soma = cpfSub.Zip(multiplicador2, (dig, mult) => int.Parse(dig.ToString()) * mult).Sum();
            resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = digito + resto;
            return cpf.EndsWith(digito);
        }

        private static bool IsCnpj(this string cpfcnpj)
        {
            var multiplicador1 = new int[12] { 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            var multiplicador2 = new int[13] { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            var cnpjSub = cpfcnpj.Substring(0, 12);
            var soma = cnpjSub.Zip(multiplicador1, (dig, mult) => int.Parse(dig.ToString()) * mult).Sum();
            var resto = (soma % 11);
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            var digito = resto.ToString();
            cnpjSub = cnpjSub + digito;
            soma = cnpjSub.Zip(multiplicador2, (dig, mult) => int.Parse(dig.ToString()) * mult).Sum();

            resto = (soma % 11);
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = digito + resto;
            return cpfcnpj.EndsWith(digito);
        }

        public static string SomenteNumeros(this string str)
            => Regex.Replace(str.Trim(), "[A-Za-z.,-/ ]", "");
    }
}
