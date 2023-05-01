using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.User.Models
{
    public class City
    {
        [Key]
        public int City_Id { get; set; }
        [Required]
        public string City_Name { get; set; }
        [Required]
        public int Country_Id { get; set; }
        [Required]
        public Country City_Country { get; set; }
    }
}
