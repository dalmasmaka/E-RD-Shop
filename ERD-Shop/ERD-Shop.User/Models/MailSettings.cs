using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.User.Models
{
    public class MailSettings
    {
        [Key]
        public int Id { get; set; }
        public string SenderAddress { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
        public bool EnableSSL { get; set; }
        public bool UseDefaultCredentials { get; set; }

    }
}
