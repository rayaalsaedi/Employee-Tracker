drop database if exists employeeDB;

create database employeeDB;

use employeeDB;

create table employee (
id int not null auto_increment,
first_name varchar (30),
last_name varchar (30),
role_id int,
manager_id int, 
primary key (id)
);

create table department(
id int not null auto_increment,
name varchar (30),
primary key (id)
);

create table role (
id int not null auto_increment,
title varchar (30),
salary decimal(10,2),
department_id int,
primary key (id)
);


