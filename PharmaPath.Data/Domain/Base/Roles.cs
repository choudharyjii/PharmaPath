namespace Mahyco.PsaPda.Data.Domain;

public partial class Roles
{
    public int Id { get; set; }
    public string RoleName { get; set; } = string.Empty;
    public bool IsActive { get; set; }
}
