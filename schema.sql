drop database if exists employeeDB;

create database employeeDB;

use employeeDB;

create table employee (
id int not null auto_increment,
roleId int,
managerId int, 
firstName varchar (50),
lastName varchar (50),
primary key (id)
);

create table department(
id int not null auto_increment,
departmentName varchar (60,
primary key (id)
);

create table positions (
id int not null auto_increment,
title varchar (50),
pay int,
departmentId int,
primary key (id)
);


