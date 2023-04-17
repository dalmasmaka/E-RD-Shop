using Microsoft.AspNetCore.Identity;

namespace ERD_Shop.User.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public DateTime BirthDate { get; set; }
        public int? City_Id { get; set; }
        public City? User_City { get; set; }
        public int Zip_Code { get; set; }
    }
}
