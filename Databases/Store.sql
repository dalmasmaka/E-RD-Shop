CREATE DATABASE Store
USE Store
CREATE TABLE Category(
categoryID int identity(1,1) primary key,
categoryName varchar(200),
categoryImg varchar(500)
);
CREATE TABLE Store(
storeID int identity(1,1) primary key,
storeName varchar(200),
storeLocation varchar(250),
storeOwner varchar(250),
storeContact varchar(250),
categoryID int,
storeImg varchar(500),
FOREIGN KEY (categoryID) REFERENCES Category(categoryID)
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
FOREIGN KEY (productVariantID) REFERENCES ProductVariant(productVariantID)
);

CREATE TABLE DiscountCode(
discountID int identity(1,1) primary key,
codeValue varchar(50),
expiration bit
);
