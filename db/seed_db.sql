delete from credentials;
insert into credentials (email, password, token) values ('test@test.com','password', '12345');

delete from user_info;
insert into user_info (type, same_as, first_name, last_name, email, address1, postal, country, region, mobile_number, credentials_id)
	values ('R', true, 'Dan', 'Freeman', 'test@test.com', '3711 se franklin st', '97202', 'US', 'OR', '503.515.2125', 1);


delete from coupon;
insert into coupon (code, item_number, price, company_id) values ('testdrive', 'C1', '12.00', 2);
insert into coupon (code, item_number, price, company_id) values ('testdrive', 'C2', '12.00', 2);

# company id 1 is for dclabs, coupon applies to everyone
insert into coupon (code, item_number, price, company_id) values ('fx family', 'B13', '8.00', 1);


delete from catalog;
# stickers only, if tape and no car then will still charge amount for the car
insert into catalog (item_number, item_name, description, thumbnail, price) values
 ('SH01', 'Shipping/Handling', '', '', '0');

# catalog entries - stickers
insert into catalog (item_number, item_name, description, thumbnail, price) values
 ('S10', 'AppFX Race Stickers', 'glossy paper finish', 'appfx_sticker-ct', '4.99');
insert into catalog (item_number, item_name, description, thumbnail, price) values
 ('S11', 'DCLabs Race Stickers', 'glossy paper finish', 'dclabs_sticker-ct', '4.99');
insert into catalog (item_number, item_name, description, thumbnail, price) values
 ('S12', 'Police Interceptor Stickers', 'glossy paper finish', 'police_sticker-ct', '4.99');
insert into catalog (item_number, item_name, description, thumbnail, price) values
 ('S13', 'Police Patrol Stickers', 'glossy paper finish', 'patrol_sticker-ct', '4.99');

# catalog entries - tape
insert into catalog (item_number, item_name, description, thumbnail, price) values
 ('T10', 'Tape Roll White', '', 'white_tape', '1.50');
insert into catalog (item_number, item_name, description, thumbnail, price) values
 ('T11', 'Tape Roll Yellow', '', 'yellow_tape', '1.50');
insert into catalog (item_number, item_name, description, thumbnail, price) values
 ('T12', 'Tape Roll Blue', '', 'blue_tape', '1.50');


# catalog entries - car
insert into catalog (item_number, item_name, description, thumbnail, price) values
 ('C1', 'FX Car iPhone/iPod 4', 'FX high quality safe and durable car', 'fxcar', '24.00');
insert into catalog (item_number, item_name, description, thumbnail, price) values
 ('C2', 'FX Car iPhone/iPod 5 (S/C)', '(Currently on BACK ORDER) FX high quality safe and durable car', 'fxcar', '24.00');

# catalog entries - bundles
insert into catalog (item_number, item_name, description, thumbnail, price) values
 ('B10', 'FX Complete Package iPhone/iPod 4', 'FX Car, 2 Sticker Sheets, Premium Edition of App', 'bundle', '29.95');

insert into catalog (item_number, item_name, description, thumbnail, price) values
 ('B11', 'FX Complete Package iPhone/iPod 5 (S/C)', '(Currently on BACK ORDER) FX Car, 2 Sticker Sheets, Premium Edition of App', 'bundle', '29.95');

insert into catalog (item_number, item_name, description, thumbnail, price) values
 ('B13', 'FX Stickers Bundle', '4 glossy paper finish sticker sheets', 'sticker-bundle-ct', '10.00');

insert into catalog (item_number, item_name, description, thumbnail, price) values
 ('B15', 'FX Tape Bundle', 'white, yellow and blue tape rolls', 'tape_tb', '3.99');

delete from company;
# for dclabs coupons that apply to everyone everywhere
insert into company (id, company_name, name, city, state, region, email) values
 (1, 'DCLabs', 'dc', 'all', 'all', 'all', 'info@appfxtoys.com');


insert into company (id, company_name, name, city, state, region, email) values
 (2, 'Backwuds', 'Mike Parker', 'Portland', 'OR', 'Portland Metro', 'mike@backwuds.com');

delete from devices;
insert into devices (device_type, price, description, credentials_id) values
 ('iphone3g', '90', 'iPhone 3G in good shape, one minor scratch on bottom left corner', 1);

insert into devices (device_type, price, description, credentials_id) values
 ('iphone3gs', '150', 'iPhone 3GS in bad shape, screen cracked, but in good working condition. Battery last a long time and comes with a T-Mobile chip', 1);

insert into devices (device_type, price, description, credentials_id) values
 ('iphone4s', '300', 'iPhone 4S in ok shape, many scratches on back cover, great phone and looking for a good home', 1);

insert into devices (device_type, price, description, credentials_id) values
 ('iphone4', '220', 'iPhone 4, works great!  Charge the battery a lot though cause it\'s almost useless if you don\'t charge it', 1);

insert into devices (device_type, price, description, credentials_id) values
 ('ipod3', '120', 'iPod 3rd generation is great condition, barely used', 1);

insert into devices (device_type, price, description, credentials_id) values
 ('ipod4', '190', 'iPod 4th generation in good condition, loaded with lots of music, don\'t tell anyone, but there are some good songs on there.', 1);

delete from zones;
insert into zones (low_zip, high_zip,zone) values (	5	,	98	,	8);
insert into zones (low_zip, high_zip,zone) values (	100	,	212	,	8);
insert into zones (low_zip, high_zip,zone) values (	214	,	268	,	8);
insert into zones (low_zip, high_zip,zone) values (	270	,	342	,	8);
insert into zones (low_zip, high_zip,zone) values (	344	,	344	,	8);
insert into zones (low_zip, high_zip,zone) values (	346	,	347	,	8);
insert into zones (low_zip, high_zip,zone) values (	349	,	352	,	8);
insert into zones (low_zip, high_zip,zone) values (	354	,	418	,	8);
insert into zones (low_zip, high_zip,zone) values (	420	,	427	,	8);
insert into zones (low_zip, high_zip,zone) values (	430	,	462	,	8);
insert into zones (low_zip, high_zip,zone) values (	463	,	464	,	7);
insert into zones (low_zip, high_zip,zone) values (	465	,	497	,	8);
insert into zones (low_zip, high_zip,zone) values (	498	,	509	,	7);
insert into zones (low_zip, high_zip,zone) values (	510	,	513	,	6);
insert into zones (low_zip, high_zip,zone) values (	514	,	514	,	7);
insert into zones (low_zip, high_zip,zone) values (	515	,	516	,	6);
insert into zones (low_zip, high_zip,zone) values (	520	,	528	,	7);
insert into zones (low_zip, high_zip,zone) values (	530	,	532	,	7);
insert into zones (low_zip, high_zip,zone) values (	534	,	535	,	7);
insert into zones (low_zip, high_zip,zone) values (	537	,	551	,	7);
insert into zones (low_zip, high_zip,zone) values (	553	,	559	,	7);
insert into zones (low_zip, high_zip,zone) values (	560	,	567	,	6);
insert into zones (low_zip, high_zip,zone) values (	570	,	576	,	6);
insert into zones (low_zip, high_zip,zone) values (	577	,	577	,	5);
insert into zones (low_zip, high_zip,zone) values (	580	,	588	,	6);
insert into zones (low_zip, high_zip,zone) values (	590	,	593	,	5);
insert into zones (low_zip, high_zip,zone) values (	594	,	599	,	4);
insert into zones (low_zip, high_zip,zone) values (	600	,	620	,	7);
insert into zones (low_zip, high_zip,zone) values (	622	,	631	,	7);
insert into zones (low_zip, high_zip,zone) values (	633	,	641	,	7);
insert into zones (low_zip, high_zip,zone) values (	644	,	658	,	7);
insert into zones (low_zip, high_zip,zone) values (	660	,	662	,	7);
insert into zones (low_zip, high_zip,zone) values (	664	,	668	,	7);
insert into zones (low_zip, high_zip,zone) values (	669	,	681	,	6);
insert into zones (low_zip, high_zip,zone) values (	683	,	693	,	6);
insert into zones (low_zip, high_zip,zone) values (	700	,	701	,	8);
insert into zones (low_zip, high_zip,zone) values (	703	,	708	,	8);
insert into zones (low_zip, high_zip,zone) values (	710	,	714	,	7);
insert into zones (low_zip, high_zip,zone) values (	716	,	722	,	7);
insert into zones (low_zip, high_zip,zone) values (	723	,	724	,	8);
insert into zones (low_zip, high_zip,zone) values (	725	,	731	,	7);
insert into zones (low_zip, high_zip,zone) values (	733	,	738	,	7);
insert into zones (low_zip, high_zip,zone) values (	739	,	739	,	6);
insert into zones (low_zip, high_zip,zone) values (	740	,	741	,	7);
insert into zones (low_zip, high_zip,zone) values (	743	,	769	,	7);
insert into zones (low_zip, high_zip,zone) values (	770	,	770	,	8);
insert into zones (low_zip, high_zip,zone) values (	772	,	777	,	8);
insert into zones (low_zip, high_zip,zone) values (	778	,	778	,	7);
insert into zones (low_zip, high_zip,zone) values (	779	,	779	,	8);
insert into zones (low_zip, high_zip,zone) values (	780	,	782	,	7);
insert into zones (low_zip, high_zip,zone) values (	783	,	785	,	8);
insert into zones (low_zip, high_zip,zone) values (	786	,	789	,	7);
insert into zones (low_zip, high_zip,zone) values (	790	,	794	,	6);
insert into zones (low_zip, high_zip,zone) values (	795	,	797	,	7);
insert into zones (low_zip, high_zip,zone) values (	798	,	799	,	6);
insert into zones (low_zip, high_zip,zone) values (	800	,	807	,	5);
insert into zones (low_zip, high_zip,zone) values (	808	,	811	,	6);
insert into zones (low_zip, high_zip,zone) values (	812	,	816	,	5);
insert into zones (low_zip, high_zip,zone) values (	820	,	831	,	5);
insert into zones (low_zip, high_zip,zone) values (	832	,	834	,	4);
insert into zones (low_zip, high_zip,zone) values (	835	,	835	,	3);
insert into zones (low_zip, high_zip,zone) values (	836	,	837	,	4);
insert into zones (low_zip, high_zip,zone) values (	838	,	838	,	3);
insert into zones (low_zip, high_zip,zone) values (	840	,	847	,	5);
insert into zones (low_zip, high_zip,zone) values (	850	,	853	,	6);
insert into zones (low_zip, high_zip,zone) values (	855	,	857	,	6);
insert into zones (low_zip, high_zip,zone) values (	859	,	860	,	6);
insert into zones (low_zip, high_zip,zone) values (	863	,	863	,	6);
insert into zones (low_zip, high_zip,zone) values (	864	,	864	,	5);
insert into zones (low_zip, high_zip,zone) values (	865	,	865	,	6);
insert into zones (low_zip, high_zip,zone) values (	870	,	871	,	6);
insert into zones (low_zip, high_zip,zone) values (	873	,	873	,	6);
insert into zones (low_zip, high_zip,zone) values (	874	,	874	,	5);
insert into zones (low_zip, high_zip,zone) values (	875	,	875	,	6);
insert into zones (low_zip, high_zip,zone) values (	877	,	885	,	6);
insert into zones (low_zip, high_zip,zone) values (	889	,	891	,	5);
insert into zones (low_zip, high_zip,zone) values (	893	,	893	,	5);
insert into zones (low_zip, high_zip,zone) values (	894	,	895	,	4);
insert into zones (low_zip, high_zip,zone) values (	897	,	898	,	4);
insert into zones (low_zip, high_zip,zone) values (	900	,	908	,	5);
insert into zones (low_zip, high_zip,zone) values (	910	,	928	,	5);
insert into zones (low_zip, high_zip,zone) values (	930	,	938	,	5);
insert into zones (low_zip, high_zip,zone) values (	939	,	966	,	4);
insert into zones (low_zip, high_zip,zone) values (	967	,	969	,	8);
insert into zones (low_zip, high_zip,zone) values (	970	,	972	,	1);
insert into zones (low_zip, high_zip,zone) values (	973	,	974	,	2);
insert into zones (low_zip, high_zip,zone) values (	975	,	976	,	3);
insert into zones (low_zip, high_zip,zone) values (	977	,	977	,	2);
insert into zones (low_zip, high_zip,zone) values (	978	,	978	,	3);
insert into zones (low_zip, high_zip,zone) values (	979	,	979	,	4);
insert into zones (low_zip, high_zip,zone) values (	980	,	985	,	2);
insert into zones (low_zip, high_zip,zone) values (	986	,	986	,	1);
insert into zones (low_zip, high_zip,zone) values (	988	,	989	,	2);
insert into zones (low_zip, high_zip,zone) values (	990	,	994	,	3);
insert into zones (low_zip, high_zip,zone) values (	995	,	997	,	7);
insert into zones (low_zip, high_zip,zone) values (	998	,	999	,	5);

insert into zone_rates (zone, cost_single_car, cost_multiple_cars) values (1,	'4.99',	'5.49');
insert into zone_rates (zone, cost_single_car, cost_multiple_cars) values (2,	'4.99',	'5.49');
insert into zone_rates (zone, cost_single_car, cost_multiple_cars) values (3,	'4.99',	'5.99');
insert into zone_rates (zone, cost_single_car, cost_multiple_cars) values (4,	'5.49',	'6.99');
insert into zone_rates (zone, cost_single_car, cost_multiple_cars) values (5,	'6.99',	'8.00');
insert into zone_rates (zone, cost_single_car, cost_multiple_cars) values (6,	'6.99',	'8.49');
insert into zone_rates (zone, cost_single_car, cost_multiple_cars) values (7,	'7.99',	'9.49');
insert into zone_rates (zone, cost_single_car, cost_multiple_cars) values (8,	'7.99',	'9.49');


delete from itunes_app_ids;
insert into itunes_app_ids (app_id) values ('P6YKWJX6NTR4');
insert into itunes_app_ids (app_id) values ('A67MP64J3PNF');
insert into itunes_app_ids (app_id) values ('TRW6W949E776');
insert into itunes_app_ids (app_id) values ('49HH9H769HE9');
insert into itunes_app_ids (app_id) values ('W7496JPRWMTA');
insert into itunes_app_ids (app_id) values ('PK4HJ9YHWWKT');
insert into itunes_app_ids (app_id) values ('HJFK7X74PPMN');
insert into itunes_app_ids (app_id) values ('7TER3KLHALN3');
insert into itunes_app_ids (app_id) values ('LW7HHYNNEJX3');
insert into itunes_app_ids (app_id) values ('EJRNTE9KA6YJ');
insert into itunes_app_ids (app_id) values ('T37KA74KL936');
insert into itunes_app_ids (app_id) values ('E4KR4WK7FY3A');
insert into itunes_app_ids (app_id) values ('WA66RX67TM6Y');
insert into itunes_app_ids (app_id) values ('E7JPHWAKKP9J');
insert into itunes_app_ids (app_id) values ('RRE9X3JPW6XM');
insert into itunes_app_ids (app_id) values ('RJ3AFPKN6P9A');
insert into itunes_app_ids (app_id) values ('N449R7649ETL');
insert into itunes_app_ids (app_id) values ('P9J6WRPWYRP4');
insert into itunes_app_ids (app_id) values ('43YRFRAJXXHR');
insert into itunes_app_ids (app_id) values ('FR7XJ9AR9EYE');
insert into itunes_app_ids (app_id) values ('6KHNYKWHEWWP');
insert into itunes_app_ids (app_id) values ('F33R49WXLYRL');
insert into itunes_app_ids (app_id) values ('EWARFJA3WH7N');
insert into itunes_app_ids (app_id) values ('NHY46NTARLHF');
insert into itunes_app_ids (app_id) values ('9P9YAXL3HYFW');
insert into itunes_app_ids (app_id) values ('PT4JYWHN6YWX');
insert into itunes_app_ids (app_id) values ('XTK7W46WFLKK');
insert into itunes_app_ids (app_id) values ('6PF9TFJMXWNH');
insert into itunes_app_ids (app_id) values ('PYANNE74X3WA');
insert into itunes_app_ids (app_id) values ('97LXL7EREFP3');
insert into itunes_app_ids (app_id) values ('33MW9J64E743');
insert into itunes_app_ids (app_id) values ('6YFF9LWPAMJF');
insert into itunes_app_ids (app_id) values ('LJNA663A3HWX');
insert into itunes_app_ids (app_id) values ('7MAK4FAPKELM');
insert into itunes_app_ids (app_id) values ('LLK3TFWM96HR');
insert into itunes_app_ids (app_id) values ('Y7EYYEEP6AA3');
insert into itunes_app_ids (app_id) values ('MRE7PXNWNTHX');
insert into itunes_app_ids (app_id) values ('T9433WJ67KFX');
insert into itunes_app_ids (app_id) values ('KXTAEX9LKE3W');
insert into itunes_app_ids (app_id) values ('H74777L4JJPY');
insert into itunes_app_ids (app_id) values ('AP4TTALKEN44');
insert into itunes_app_ids (app_id) values ('AHLAFXLLN6M6');
insert into itunes_app_ids (app_id) values ('PTEAAWMA3MR7');
insert into itunes_app_ids (app_id) values ('NTEMY9FK4NRA');
insert into itunes_app_ids (app_id) values ('MF93WN9FFXP6');
insert into itunes_app_ids (app_id) values ('XMPYK7NX9E3R');
insert into itunes_app_ids (app_id) values ('TJK3LF9KKRT3');
insert into itunes_app_ids (app_id) values ('66PMMY3MEL37');
insert into itunes_app_ids (app_id) values ('NKPW7L9JTFT9');
insert into itunes_app_ids (app_id) values ('MTHHR9Y6KW9X');
insert into itunes_app_ids (app_id) values ('YFK47RFLNMJ9');
insert into itunes_app_ids (app_id) values ('EN7W9NKE3WH9');
insert into itunes_app_ids (app_id) values ('Y7KAMYNAXWRN');
insert into itunes_app_ids (app_id) values ('66LJ3A4AWN9R');
insert into itunes_app_ids (app_id) values ('TWXNNMY4HMRT');
insert into itunes_app_ids (app_id) values ('YWF4EN6PLP7H');
insert into itunes_app_ids (app_id) values ('XNH4T7AYRNMW');
insert into itunes_app_ids (app_id) values ('3WAMLHYR7K4H');
insert into itunes_app_ids (app_id) values ('HNW4F6K3MNRW');
insert into itunes_app_ids (app_id) values ('N49RW4FL7WT6');
insert into itunes_app_ids (app_id) values ('7JA6YHXLAMAK');
insert into itunes_app_ids (app_id) values ('P4ERKKTKJXTR');
insert into itunes_app_ids (app_id) values ('LML3H6YXPLNX');
insert into itunes_app_ids (app_id) values ('PR3NMPLJX7Y7');
insert into itunes_app_ids (app_id) values ('4FEXA739XNKJ');
insert into itunes_app_ids (app_id) values ('AMRTWE9F64JX');
insert into itunes_app_ids (app_id) values ('L6EAKPKXN4KF');
insert into itunes_app_ids (app_id) values ('6WTREK76NNNL');
insert into itunes_app_ids (app_id) values ('A9YN7WAAN3WA');
insert into itunes_app_ids (app_id) values ('LR7YMKRMP9XM');
insert into itunes_app_ids (app_id) values ('9YJMNLKLAKEY');
insert into itunes_app_ids (app_id) values ('XPJ4HHL3YYP9');
insert into itunes_app_ids (app_id) values ('E36TPKFTKNYR');
insert into itunes_app_ids (app_id) values ('Y6FE6HKHLHFN');
insert into itunes_app_ids (app_id) values ('FP946WLPFXRH');
insert into itunes_app_ids (app_id) values ('P9E46WTJ7HHH');
insert into itunes_app_ids (app_id) values ('X4Y63AKH373N');
insert into itunes_app_ids (app_id) values ('XEHLMXY3AENT');
insert into itunes_app_ids (app_id) values ('H9AWFAKHFPLY');
insert into itunes_app_ids (app_id) values ('TY36EXHN7P9P');
insert into itunes_app_ids (app_id) values ('AFA3LYX9M6ME');
insert into itunes_app_ids (app_id) values ('HPNEJL4P3X63');
insert into itunes_app_ids (app_id) values ('9HEXXKMN4T9T');
insert into itunes_app_ids (app_id) values ('3KLNRYPNY3P4');
insert into itunes_app_ids (app_id) values ('AX4AYHMR6AAR');
insert into itunes_app_ids (app_id) values ('JMHNYXYWPJLA');
insert into itunes_app_ids (app_id) values ('W9XXJLP7XXRX');
insert into itunes_app_ids (app_id) values ('JY3JMWA6R9YN');
insert into itunes_app_ids (app_id) values ('36WWNALR9J7K');
insert into itunes_app_ids (app_id) values ('4KER73KPEXA7');
insert into itunes_app_ids (app_id) values ('HTRW74KHYERH');
insert into itunes_app_ids (app_id) values ('JLTWL9RRYK3F');
insert into itunes_app_ids (app_id) values ('JLWPTWXTR39F');
insert into itunes_app_ids (app_id) values ('9J4RT6NLME4F');
insert into itunes_app_ids (app_id) values ('KNTT99MH4T7K');
insert into itunes_app_ids (app_id) values ('ATEX493NPHXL');
insert into itunes_app_ids (app_id) values ('6KRNRYYH7R6X');
insert into itunes_app_ids (app_id) values ('RKXKEJ6Y4JFT');
insert into itunes_app_ids (app_id) values ('KEYXFFXRL4PP');
insert into itunes_app_ids (app_id) values ('XA9KTPJNXARF');
