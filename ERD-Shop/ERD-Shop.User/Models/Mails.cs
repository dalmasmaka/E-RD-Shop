using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.User.Models
{
    public class Mails
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string EmailConfirmationLink { get; set; }
       
    }
}
