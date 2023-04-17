using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.User.Models
{
    public class Country
    {
        [Key]
        public int Country_Id { get; set; }
        public string Country_Name { get; set; }
    }
}
