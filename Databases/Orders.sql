create database Orders
use Orders

create table Orders(
orderID int identity(1,1) primary key,
totalPrice float(20),
orderDate datetime,
shippingAddress varchar(250),
[User_Id] int foreign key references [User]([User_Id]) on delete set null,
codeValueID int foreign key references DiscountCode(codeValueID) on delete set null
)
create table [User](
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
create table ProductVariant(
productVariantID int identity(1,1) primary key,
name varchar(250),
price int
)
create table Order_ProductVariant(
orderID int foreign key references Orders(orderID),
productVariantID int foreign key references ProductVariant(productVariantID),
primary key(orderID,productVariantID)
)
create table Refund(
refundID int identity(1,1) primary key,
refundDate datetime,
refundStatus varchar(250),
orderID int foreign key references Orders(orderID) on delete set null,
[User_Id] int foreign key references [User]([User_Id]) on delete set null
)

create table PaymentGateway(
paymentGatewayID int identity(1,1) primary key,
paymentGatewayName varchar(250),
paymentAmount float(20),
paymentStatus varchar(250),
paymentMethod varchar(250),
paymentTransactionId int
)
create table DiscountCode(
codeValueID int identity(1,1) primary key,
expirationDate datetime,
usageLimit int not null,
[User_Id] int foreign key references [User]([User_Id]) on delete set null,
)

