using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PharmaPath.Data.Domain
{
    public class UserDetails : User
    {
        
    }

    public class LoginUserDetails
    {
        public string EMP_STAFFID { get; set; }
        public string EMP_SAPID { get; set; }
        public string? EMP_EMPOWERNAME { get; set; }
        public string? EMP_SEX { get; set; }
        public string? EMP_MAILID { get; set; }
        public string? EMP_PERSONALMAILID { get; set; }
        public string? EMP_UNIT { get; set; }
        public string? EMP_ACTIVESTATUS { get; set; }
        public string? EMP_DESIGNATION { get; set; }
        public string? EMP_LOCATION { get; set; }
        public string? EMP_REPORTINGTO { get; set; }
        public string? ContactNo { get; set; }
        public string? UniqueCode { get; set; }
        public string? L1MailNeeded { get; set; }
        public DateTime TrDate { get; set; }
        public byte EmpLoginStatus { get; set; }
        public byte LoginCount { get; set; }
        public byte AccountLock { get; set; }
        public byte IsVisible { get; set; }
        public DateTime? DisabledOn { get; set; }
        public string EnteredBy { get; set; }
        public DateTime EnteredDate { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? ActivityDept { get; set; }
    }

    public class UserRole
    {
        public int RoleId { get; set; }
        public string Role { get; set; }
        public int RoleSrCount { get; set; }
    }
}
