namespace PharmaPath. Data.Domain;

public class BaseDomain
{
    public int Id { get; set; }
    public string CreatedBy { get; set; }
    public DateTime CreatedOn { get; set; }
    public string ModifiedBy { get; set; }
    public DateTime ModifiedOn { get; set; }
    public bool IsActive { get; set; } = true;

}

public class SelectOptionItems
{
    public int id { get; set; }
    public string value { get; set; }
    public string text { get; set; }
}
