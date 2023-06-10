namespace ERD_Shop.Store.Models.DTOs
{
    public class UserDto
    {
        public string? UserId { get; set; } 
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public int? ZipCode { get; set; }
        public DateTime? Birthdate { get; set; }
        public string? Role { get; set; }
        public int? CityId { get; set; }
        public string? Address { get; set; }
    }
}
