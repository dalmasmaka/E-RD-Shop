using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.User.Models.DTO
{
    public class RegisterApplicationUserDto
    {
        [Required]
        [RegularExpression("^[A-Z][a-zA-Z]*$", ErrorMessage = "First Name must start with capital letter!")]
        public string First_Name { get; set; }
        [Required]
        [RegularExpression("^[A-Z][a-zA-Z]*$", ErrorMessage = "Last Name must start with a capital letter!")]
        public string Last_Name { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
        [Required]
        public int? City_Id { get; set; }
        [Required]
        public int Zip_Code { get; set; }
        [Required]
        [RegularExpression("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", ErrorMessage = "Email address not valid please try again")]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
