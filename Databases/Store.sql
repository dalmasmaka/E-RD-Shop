CREATE DATABASE Store
USE Store
CREATE TABLE Category(
categoryID int identity(1,1) primary key,
categoryName varchar(200),
categoryImg varchar(500)
);
CREATE TABLE [User](
	[User_Id] int primary key identity(1,1),
	[First_Name] varchar(20),
	[Last_Name] varchar(20),
	Email varchar(50) unique,
	[Password] varchar(50),
	[Address] varchar(50),
	Zip_Code int,
	Birthdate date,
	[Role_Id] int,
	City_Id int
)
CREATE TABLE Store(
storeID int identity(1,1) primary key, 
[User_Id] int,
storeName varchar(200),
storeLocation varchar(250),
storeOwner varchar(250),
storeContact varchar(250),
storeImg varchar(500),
FOREIGN KEY (User_Id) REFERENCES [User]([User_Id])
);
CREATE TABLE Store_Category(
storeID int,
categoryID int,
FOREIGN KEY (storeID) REFERENCES Store(storeID),
FOREIGN KEY (categoryID)REFERENCES Category(categoryID)
);
CREATE TABLE ProductVariant(
productVariantID int identity(1,1) primary key,
productVariantName varchar(250),
skuCode varchar(50),
stockQuantity int,
shortDescription varchar(500),
productVariantImg varchar(500)
);
CREATE TABLE Product(
productID int identity(1,1) primary key,
productName varchar(250),
productImg varchar(250),
productVariantID int,
storeID int,
FOREIGN KEY (productVariantID) REFERENCES ProductVariant(productVariantID),
FOREIGN KEY(storeID) REFERENCES Store(storeID)
);
