using ERD_Shop.User.Models;

namespace ERD_Shop.User.Repositories.Interfaces
{
    public interface IMailRepository
    {
        Task SendMailAsync(Mails mailRequest);

    }
}
