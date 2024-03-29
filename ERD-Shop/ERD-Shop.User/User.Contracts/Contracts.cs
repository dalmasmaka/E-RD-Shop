﻿namespace User.Contracts;
public record ApplicationOrderUserCreated(string Id, string First_Name, string Last_Name, DateTime BirthDate, int City_Id, int Zip_Code, string Address, string Email, string Role);
public record ApplicationOrderUserUpdated(string Id, string First_Name, string Last_Name, DateTime BirthDate, int City_Id, int Zip_Code, string Address, string Email, string Role);
public record ApplicationStoreUserCreated(string Id, string First_Name, string Last_Name, DateTime BirthDate, int City_Id, int Zip_Code, string Address, string Email, string Role);
public record ApplicationStoreUserUpdated(string Id, string First_Name, string Last_Name, DateTime BirthDate, int City_Id, int Zip_Code, string Address, string Email, string Role);
public record ApplicationStoreUserDeleted(string Id);
public record ApplicationUserDeleted(string Id);