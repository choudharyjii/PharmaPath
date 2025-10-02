using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PharmaPath. Data.Domain
{
    public class UserRolePermissionDetails
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string EmployeeName { get; set; }
        public int RoleId { get; set; }
        public string RoleCode{ get; set; }
        public string RoleName { get; set; }
        public int PermissionId { get; set; }
        public string PermissionName { get; set; }
        public string PermissionCode { get; set; }
    }
}
