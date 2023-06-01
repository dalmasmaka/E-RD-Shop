namespace ERD_Shop.User.Contracts
{
    public record ApplicationOrderUserCreated(string Id, string First_Name, string Last_Name, DateTime BirthDate, int City_Id, int Zip_Code, string Address, string Email, string Role);
    public record ApplicationOrderUserUpdated(string Id, string First_Name, string Last_Name, DateTime BirthDate, int City_Id, int Zip_Code, string Address, string Email, string Role);

    public record ApplicationUserDeleted(string Email);
}
