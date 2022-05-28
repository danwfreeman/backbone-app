alter table test_table add column email TIMESTAMP DEFAULT CURRENT_TIMESTAMP

drop table cart;
drop table contact_us;
drop table user_info;
drop table credentials;

delete from cart;

create table test_table (
ids mediumint not null primary key auto_increment,
fname varchar(100) not null
);

create table test (str varchar(32), ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

insert into user_info (type, first_name) value ('S','dan')

update user_info set region='Oregon' where id = 1

select email, token from credentials where token = '12345' and email='dan@appfx.com'

select cart.id, name, description, price, quantity, thumbnail, credentials_id from cart, credentials where 
cart.credentials_id = cart.id and credentials.email = 'dan@appfx.com'


select cart.id, name, description, price, quantity, thumbnail, credentials_id from cart, credentials where 
cart.credentials_id = credentials.id and credentials.email = 'dan@appfx.com'

update cart set quantity = 6 where id=2

show variables like "max_connections";