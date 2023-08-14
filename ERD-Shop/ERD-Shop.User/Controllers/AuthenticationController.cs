using ERD_Shop.User.Models;
using ERD_Shop.User.Models.DTO;
using ERD_Shop.User.Repositories.Interfaces;
using ERD_Shop.User.Services;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Formats.Asn1;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using User.Contracts;

namespace ERD_Shop.User.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IWishlistRepository _wishlistRepository;
        private readonly IShoppingCartRepository _shoppingCartRepository;
        private readonly IPublishEndpoint _publishEndpoint;
        private readonly TokenService _tokenService;
        private readonly IConfiguration _configuration;

        public AuthenticationController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IPublishEndpoint publishEndpoint, IWishlistRepository wishlistRepository, IShoppingCartRepository shoppingCartRepository, SignInManager<ApplicationUser> signInManager, TokenService tokenService, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _publishEndpoint = publishEndpoint;
            _wishlistRepository = wishlistRepository;
            _shoppingCartRepository = shoppingCartRepository;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _configuration = configuration;
        }

        [HttpGet("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            //Getting list of users
            List<ApplicationUser> users = await _userManager.Users.ToListAsync();
            //Managing case when user list is empty
            if (users.Count == 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new ResponseDto { IsSuccess = false, Message = "There are no users in your database!" });
            }
            //Return success
            return StatusCode(StatusCodes.Status200OK, new ResponseDto { IsSuccess = true, Message = "OK", Result = users });
        }
        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterApplicationUserDto registrationUser, string role)
        {
            // Checking if the user email exist
            var userExists = await _userManager.FindByEmailAsync(registrationUser.Email);
            if (userExists != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new ResponseDto { IsSuccess = false, 
                                                                                    Message = "This email is in use" });
            }
            // Creating an ApplicationUser Object to inherit IdentityUser variables
            ApplicationUser applicationUser = new ApplicationUser { 
                                                                    UserName = registrationUser.Email,
                                                                    First_Name = registrationUser.First_Name, 
                                                                    Last_Name = registrationUser.Last_Name,
                                                                    BirthDate = registrationUser.BirthDate,
                                                                    City_Id = registrationUser.City_Id,
                                                                    Zip_Code = registrationUser.Zip_Code,
                                                                    Address = registrationUser.Address,
                                                                    Email = registrationUser.Email,
                                                                    SecurityStamp = Guid.NewGuid().ToString()};
            
            if(!await _roleManager.RoleExistsAsync(role))
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDto { IsSuccess = false,
                                                                                              Message = "Role doesn't exist!"});
            }

            //Returns the result of registration attempt (The method recieves an IdentityUser or IdentityUser Child and Password to Hash)
            var result = await _userManager.CreateAsync(applicationUser, registrationUser.Password);
            //Managing the result above
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(applicationUser, role);
                WishlistDto wishlist = new WishlistDto { ApplicationUserId = applicationUser.Id };
                ShoppingCartDto shoppingCart = new ShoppingCartDto { ApplicationUserId = applicationUser.Id };
                await _wishlistRepository.CreateWishlist(wishlist);
                await _shoppingCartRepository.CreateShoppingCart(shoppingCart);
                await _publishEndpoint.Publish(new ApplicationOrderUserCreated(applicationUser.Id, applicationUser.First_Name, applicationUser.Last_Name, applicationUser.BirthDate, (int)applicationUser.City_Id, applicationUser.Zip_Code, applicationUser.Address, applicationUser.Email, role));
                if(role.ToUpper() == "STORE KEEPER")
                {
                    await _publishEndpoint.Publish(new ApplicationStoreUserCreated(applicationUser.Id, applicationUser.First_Name, applicationUser.Last_Name, applicationUser.BirthDate, (int)applicationUser.City_Id, applicationUser.Zip_Code, applicationUser.Address, applicationUser.Email, role));
                }
                return StatusCode(StatusCodes.Status201Created, new ResponseDto { IsSuccess = true, 
                                                                                  Result = registrationUser,
                                                                                  Message = "User created successfully!" });
            }
            else
            {
                List<string> errorDescriptions = result.Errors.Select(e => e.Description).ToList();
                return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDto { IsSuccess = false, 
                                                                                              Message = "User failed to be created!",
                                                                                              Errors = errorDescriptions});
            }
        }
        [AllowAnonymous]
        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(LoginApplicationUserDto loginUser, bool isPersistent)
        {
            var result = await _signInManager.PasswordSignInAsync(loginUser.Email, loginUser.Password, isPersistent, false);
            if(result.Succeeded)
            {
                ApplicationUser user = await _userManager.FindByNameAsync(loginUser.Email);
                loginUser.Token = await _tokenService.GenerateToken(user);
                return StatusCode(StatusCodes.Status200OK, new ResponseDto { IsSuccess = true, Result = new {Token = loginUser.Token}, Message = "User has logged in" });
            }
            return StatusCode(StatusCodes.Status404NotFound, new ResponseDto { IsSuccess = false, Result = result, Message = "Email or Password is Invalid!"});
        }

        [HttpPost("SignOut")]
        public async Task<IActionResult> SignOut()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return StatusCode(StatusCodes.Status202Accepted, new ResponseDto { IsSuccess = true, Message = "User succesfully logged out" });
            }catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new ResponseDto { IsSuccess = false, Message = ex.Message, Errors = new List<string>() { ex.ToString() } });
            }
        }

        [HttpGet("IsLoggedIn")]
        public IActionResult IsLoggedIn()
        {
            if (User.Identity?.IsAuthenticated == true)
            {
                return Ok(new { IsLoggedIn = true, ApplicationUser = User.Identity.Name });
            }

            return Ok(new { IsLoggedIn = false });
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            ApplicationUser user = await _userManager.FindByIdAsync(id);
            if(user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new ResponseDto { IsSuccess = false, Message = "User with this id does not exist!" });
            }

            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded) {
                await _wishlistRepository.DeleteWishlist(id);
                await _shoppingCartRepository.DeleteShoppingCart(id);
                await _publishEndpoint.Publish(new ApplicationUserDeleted(id));
                return StatusCode(StatusCodes.Status200OK, new ResponseDto { IsSuccess = true, Message = "User deleted successfully" });
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDto { IsSuccess = false, Message = "User failed to be deleted" });
        }
    }
}
