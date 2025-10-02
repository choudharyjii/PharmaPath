using PharmaPath.Service.DataModel;
using System.Security.Cryptography;
using System.Text;

public interface ICryptoService
{
    Task<string> Encrypt(string stringToEncrypt);
    Task<UserCodeDateTokenModel> Decrypt(string encryptedString);
    //static byte[] MD5Hash(string value);
}
public class CryptoService : ICryptoService
{
    //private static TripleDESCryptoServiceProvider DES = new TripleDESCryptoServiceProvider();
    private static MD5CryptoServiceProvider MD5 = new MD5CryptoServiceProvider();
    private readonly string _hashKey = "MAHYCOJALNA";
    public static byte[] MD5Hash(string value)
    {
        return MD5.ComputeHash(Encoding.ASCII.GetBytes(value));
    }

    //public async Task<string> Encrypt(string stringToEncrypt)
    //{
    //    var DES = new TripleDESCryptoServiceProvider();
    //    DES.Key = CryptoService.MD5Hash(_hashKey);
    //    DES.Mode = CipherMode.ECB;
    //    byte[] Buffer = Encoding.ASCII.GetBytes(stringToEncrypt);
    //    return Convert.ToBase64String(DES.CreateEncryptor().TransformFinalBlock(Buffer, 0, Buffer.Length));
    //}
    public async Task<string> Encrypt(string stringToEncrypt)
    {
        var DES = new TripleDESCryptoServiceProvider();
        DES.Key = CryptoService.MD5Hash(_hashKey);
        DES.Mode = CipherMode.ECB;
        byte[] Buffer = Encoding.ASCII.GetBytes(stringToEncrypt);
        byte[] encryptedBytes = DES.CreateEncryptor().TransformFinalBlock(Buffer, 0, Buffer.Length);

        // Custom encoding to replace '+'
        return Convert.ToBase64String(encryptedBytes)
            .Replace('+', '-'); // Replace '+' with '-', adjust as needed
    }
    public async Task<UserCodeDateTokenModel> Decrypt(string encryptedString)
    {
        var userCodeDateTokenModel = new UserCodeDateTokenModel();
        var token = encryptedString.Replace('-', '+');
        var DES = new TripleDESCryptoServiceProvider();
        DES.Key = CryptoService.MD5Hash(_hashKey);
        DES.Mode = CipherMode.ECB;
        byte[] Buffer = Convert.FromBase64String(token);
        userCodeDateTokenModel.Token = Encoding.ASCII.GetString(DES.CreateDecryptor().TransformFinalBlock(Buffer, 0, Buffer.Length));
        return userCodeDateTokenModel;
    }
}