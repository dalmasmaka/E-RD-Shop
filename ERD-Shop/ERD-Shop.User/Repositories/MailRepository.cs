using ERD_Shop.User.Models;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using MailKit;
using ERD_Shop.User.Repositories.Interfaces;
using MassTransit.Configuration;
using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Net;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace ERD_Shop.User.Repositories
{
    public class MailRepository : IMailRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly MailSettings  _mailSettings;
        public MailRepository(UserManager<ApplicationUser> userManager, IOptions<MailSettings> mailSettings) {
            _userManager = userManager;
            this._mailSettings = mailSettings.Value;
        }
        public async Task<IdentityResult>ConfirmEmailAsync(string uid, string token)
        {
            return await _userManager.ConfirmEmailAsync(await _userManager.FindByIdAsync(uid), token);
        }
        public async Task SendMailAsync(Mails mailRequest)
        {
            MailMessage mail = new MailMessage
            {
               
                Subject = mailRequest.Subject,
                Body = mailRequest.Body,
                From = new MailAddress(_mailSettings.SenderAddress, _mailSettings.DisplayName),      

            };
            // Add recipient email address using the To.Add method
            mail.To.Add(mailRequest.ToEmail);
            mail.Body += Environment.NewLine + mailRequest.EmailConfirmationLink;
            NetworkCredential networkCredentials = new NetworkCredential(_mailSettings.UserName, _mailSettings.Password);
            System.Net.Mail.SmtpClient smtpClient = new System.Net.Mail.SmtpClient
            {
                Host = _mailSettings.Host,
                Port = _mailSettings.Port,
                EnableSsl = _mailSettings.EnableSSL,
                UseDefaultCredentials = _mailSettings.UseDefaultCredentials,
                Credentials = networkCredentials

            };
            mail.BodyEncoding = Encoding.Default;
            await smtpClient.SendMailAsync(mail);
        }
    }
}
 