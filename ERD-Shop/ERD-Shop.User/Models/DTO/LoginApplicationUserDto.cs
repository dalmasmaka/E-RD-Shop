﻿using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.User.Models.DTO
{
    public class LoginApplicationUserDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public string? Token { get; set; }
    }
}
