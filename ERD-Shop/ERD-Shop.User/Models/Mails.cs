namespace ERD_Shop.User.Models
{
    public class Mails
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public List<IFormFile> Attachements { get; set; }
    }
}
