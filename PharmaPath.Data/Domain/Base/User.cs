namespace PharmaPath.Data.Domain;

public partial class User : BaseDomain
{
    public string UserName { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string EmailId { get; set; } = string.Empty;
    public string Locatioin { get; set; } = string.Empty;
    public string UserCode { get; set; } = string.Empty;
}
