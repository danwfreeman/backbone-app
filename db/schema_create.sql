drop table user_info;
drop table credentials;
drop table contact_us;
drop table devices;
drop table coupon;
drop table company;
drop table catalog;
drop table audit;
drop table transaction_item;
drop table itunes_app_ids;
drop table transaction;
drop table zones;
drop table zone_rates;


create table user_info (
    id              		int not null primary key auto_increment,
    type        			varchar(255) not null,
    same_as      			boolean,
    first_name      		varchar(255),
    last_name        		varchar(255),
    email					varchar(255),
    address1     			varchar(255),
    address2     			varchar(255),
    city	     			varchar(255),
    postal          		varchar(255),
    country        			varchar(255),
	region					varchar(255),
	mobile_number			varchar(255),
	credentials_id			int,
    created_datetime 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_datetime		datetime
	
);

create table credentials (
    id              		int not null primary key auto_increment,
    email					varchar(255),
	password				varchar(255),
	token					varchar(255),
	is_guest				boolean,
    created_datetime 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_datetime		datetime
	
);

create table transaction (
    id              		int not null primary key auto_increment,
	credentials_id			int,
	is_purchased			boolean,
	total_amount			varchar(255),
	tracking_number			varchar(255),
	paypal_correlation_id	varchar(255),
	paypal_transaction_id	varchar(255),
    created_datetime 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_datetime		datetime
);

create table transaction_item (
    id              		int not null primary key auto_increment,
	transaction_id			int,
	FOREIGN KEY (transaction_id) REFERENCES transaction(id),
	item_number				varchar(255),
	quantity				int,
	coupon_code				varchar(255),
	amount					varchar(255),
    created_datetime 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_datetime		datetime
);



create table contact_us (
    id              		int not null primary key auto_increment,
    first_name				varchar(255),
	last_name				varchar(255),
	email					varchar(255),
	message					varchar(4096),
    created_datetime 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_datetime		datetime
);

create table devices (
    id              		int not null primary key auto_increment,
    device_type				varchar(255),
    price					varchar(255),
	description				varchar(4096),
	credentials_id			int,
    created_datetime 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_datetime		datetime
);

create table coupon (
    id              		int not null primary key auto_increment,
    code					varchar(255),
    item_number				varchar(255),
    price					varchar(255),
    company_id				int
);

create table catalog (
    id              		int not null primary key auto_increment,
	item_number				varchar(255),
    item_name				varchar(255),
    description				varchar(1024),
    thumbnail				varchar(255),
    price					varchar(255)
);


create table company (
    id              		int not null primary key auto_increment,
	company_name			varchar(255),
	name					varchar(255),
    city					varchar(255),
    state					varchar(255),
    region					varchar(255),
    region_description		varchar(255),
    email					varchar(255),
    created_datetime 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_datetime		datetime	
);

create table audit (
	coupon_id				int,
	read_date				datetime
);

create table zones (
  low_zip   int,
  high_zip  int,
  zone      int
);

create table zone_rates (
  zone   			  int,
  cost_single_car     varchar(5),
  cost_multiple_cars   varchar(5)
);

create table itunes_app_ids (
  id 					int not null primary key auto_increment,
  app_id    			varchar(255),
  transaction_id		int,
  FOREIGN KEY (transaction_id) REFERENCES transaction(id),
  created_datetime 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_datetime		datetime
);


