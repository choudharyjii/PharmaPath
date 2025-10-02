using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PharmaPath. Service.Utility
{
    public static class Constants
    {
        public enum AutheticationType
        {
            UsernameAndPassword,
            SingleSignOn,
            EmailAuthentication
        }
        public enum PurityTestStatus
        {
            Draft = 0,
            Pass = 1,
            Fail = 2
        }
        public enum PuttingTestType
        {
            Both = 0,
            Germination,
            Emergence
        }
        public enum NotificationType
        {
            RequestCreated = 300,
            RequestUpdated = 301,
            RequestActivityChange = 302,
            RequestResolved = 303,
            RequestClosed = 304
        }
        public enum RecepientPersonType
        {
            Creator = 200,
            ActionTaker = 201,
            Approver = 202,
            Collaborator = 203,
        }
        public enum EmailRecepientType
        {
            To = 100,
            Cc = 101,
            Bcc = 102,
            None = 104,
        }
        public enum Status{
            New = 0,
            InProgress = 1,
            Close = 5
        }

        public enum IncidentStatus
        {
            ActionNotTaken = 0,
            Forwarded = 1,
            Close = 9,
        }
        public enum ChangeRequestStatus
        {
          PendingForApproval = 0,
          Approved = 1,
          Reject = 2,
          Close = 3 
        }
        public enum ChangeRequestTaskStatus
        {
          ToDo = 0,
          InProgress,
          Done,
          Approved
        }
        public enum ChangeRequestTaskActivity
        {
            Responded = 1,
            ReAssigned,
        }
    }
}
