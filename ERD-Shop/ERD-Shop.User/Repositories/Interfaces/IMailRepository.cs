using ERD_Shop.User.Models;
using Microsoft.AspNetCore.Identity;

namespace ERD_Shop.User.Repositories.Interfaces
{
    public interface IMailRepository
    {
        Task<IdentityResult> ConfirmEmailAsync(string uid, string token);
        Task SendMailAsync(Mails mailRequest);

    }
}
