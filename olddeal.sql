SET NAMES UTF8;
  DROP DATABASE IF EXISTS OldDeal;
  CREATE DATABASE OldDeal CHARSET=UTF8;
  USE OldDeal;
  CREATE TABLE OldDeal_user(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(32),
    upwd VARCHAR(32),
    corfirmupwd VARCHAR(64),
    QQ VARCHAR(32),
    otherCode varchar(32),
    safe VARCHAR(200),
    answer VARCHAR(200),
    integral INT,
    memberLevel INT,
    headImg VARCHAR(200)
  );
  INSERT INTO OldDeal_user VALUES
  (1, 'flower', '123456','123456','1317191328','','你知不知道我知道你是谁','知道',99,2,'img/person.jpg');
  INSERT INTO OldDeal_user VALUES
  (2, 'snow', '123456','123456','2364220583','','你知不知道我知道你是谁','知道',98,2,'img/person.jpg');
  INSERT INTO OldDeal_user VALUES
  (3, 'wangjf', '123456','123456','2942014019','','你知不知道我知道你是谁','知道',100,2,'img/person.jpg');
  INSERT INTO OldDeal_user VALUES
  (4, 'zhaoyang', '123456','123456','2364220583','','你知不知道我知道你是谁','知道',100,0,'img/person.jpg');
  INSERT INTO OldDeal_user VALUES
  (5, 'xiayu', '123456','123456','2942014019','','你知不知道我知道你是谁','知道',100,1,'img/person.jpg');

  CREATE TABLE pub (
  PID INT PRIMARY KEY AUTO_INCREMENT,
  userId INT,
  UNAME VARCHAR(32),
  PNAME VARCHAR(32),
  PONE VARCHAR(32),
  PTWO VARCHAR(32),
  PRICE FLOAT(10,2),
  NEWOLD VARCHAR(32),
  PUBTIME DATETIME,
  RETAINTIME VARCHAR(32),
  STAUS int,
  PDESC VARCHAR(200),
  PRES VARCHAR(200),
  PIC1 VARCHAR(128),
  PIC2 VARCHAR(128),
  PIC3 VARCHAR(128),
  PIC4 VARCHAR(128),
  PIC5 VARCHAR(128),
  PIC6 VARCHAR(128)
  );
  INSERT INTO pub VALUES (NULL,1,'flower','JAVA书','书籍','计算机相关类','10','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,2,'snow','海燕','书籍','Java初级','1000','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,3,'wangjf','女生cute包','鞋包','背包','33','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/big2.jpg','images/big2.jpg','images/big2.jpg','images/big2.jpg','images/big2.jpg','images/big2.jpg'),
  (NULL,1,'flower','有梦不觉人生寒','书籍','哲学','80','八成新','2017/1/12','三个月',0,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,1,'flower','午夜起来','书籍','文学','46','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book2.jpg','images/book2.jpg','images/book2.jpg','images/book2.jpg','images/book2.jpg','images/book2.jpg'),
  (NULL,2,'snow','海燕','书籍','Java初级','1000','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,2,'snow','收纳盒','家居用品','家居类','30.00','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/box1.jpg','images/box1.jpg','images/box1.jpg','images/box1.jpg','images/box1.jpg','images/box1.jpg'),
  (NULL,3,'wangjf','永久自行车','校园代步','自行车','1000','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/byc1.jpg','images/byc1.jpg','images/byc1.jpg','images/byc1.jpg','images/byc1.jpg','images/byc1.jpg'),
  (NULL,1,'flower','凤凰自行车','校园代步','自行车','234','八成新','2017/1/12',1,'三个月','这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/byc2.jpg','images/byc2.jpg','images/byc2.jpg','images/byc2.jpg','images/byc2.jpg','images/byc2.jpg'),
  (NULL,2,'snow','海燕','书籍','Java初级','1000','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,3,'wangjf','折叠自行车','校园代步','自行车','156','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/byc3.jpg','images/byc3.jpg','images/byc3.jpg','images/byc3.jpg','images/byc3.jpg','images/byc3.jpg'),
  (NULL,1,'flower','UI设计时代','书籍','Java初级','100','八成新','2017/1/12','三个月',0,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,2,'snow','山海经','书籍','故事类','789','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book3.jpg','images/book3.jpg','images/book3.jpg','images/book3.jpg','images/book3.jpg','images/book3.jpg'),
  (NULL,3,'wangjf','海燕','书籍','Java初级','56','八成新','2017/1/12','三个月',0,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,1,'flower','西方哲学','书籍','哲学','101','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book6.jpg','images/book6.jpg','images/book6.jpg','images/book6.jpg','images/book6.jpg','images/book6.jpg'),
  (NULL,1,'flower','美女与野兽','书籍','故事类','55','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book4.jpg','images/book4.jpg','images/book4.jpg','images/book4.jpg','images/book4.jpg'),
  (NULL,2,'snow','红楼梦','书籍','名著','88.8','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book5.jpg','images/book5.jpg','images/book5.jpg','images/book5.jpg','images/book5.jpg','images/book5.jpg'),
  (NULL,3,'wangjf','海燕','书籍','Java初级','1000','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,1,'flower','海燕','书籍','Java初级','1000','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,2,'snow','凤凰自行车','校园代步','自行车','101.1','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/bycke33.jpg','images/bycke33.jpg','images/bycke33.jpg','images/bycke33.jpg','images/bycke33.jpg','images/bycke33.jpg'),
  (NULL,3,'wangjf','安踏小白鞋','鞋','休闲鞋','22','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/footer1.jpg','images/footer1.jpg','images/footer1.jpg','images/footer1.jpg','images/footer1.jpg','images/footer1.jpg'),
  (NULL,3,'wangjf','小白鞋','鞋包配饰','休闲鞋','55','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/footer2.jpg','images/footer2','images/footer2','images/footer2','images/footer2','images/footer2'),
  (NULL,2,'snow','大东白鞋','鞋','休闲鞋','77','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/footer3.jpg','images/footer3.jpg','images/footer3.jpg','images/footer3.jpg','images/footer3.jpg','images/footer3.jpg'),
  (NULL,1,'flower','舒服佳肥皂','家居用品','洗漱用品','89','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/soap.jpg','images/soap.jpg','images/soap.jpg','images/soap.jpg','images/soap.jpg','images/soap.jpg'),
  (NULL,1,'flower','大白灯','家居用品','照明类','59','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/light1.jpg','images/light1.jpg','images/light1.jpg','images/light1.jpg','images/light1.jpg','images/light1.jpg'),
  (NULL,2,'snow','机器猫灯','家居用品','照明类','60','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/light2.jpg','images/light2.jpg','images/light2.jpg','images/light2.jpg','images/light2.jpg','images/light2.jpg'),
  (NULL,3,'wangjf','多体积收纳盒','家居用品','储存类','27','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/box.jpg','images/box.jpg','images/box.jpg','images/box.jpg','images/box.jpg','images/box.jpg'),
  (NULL,1,'flower','比幸福还要幸福的幸福','书籍','文学类','38','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book7.jpg','images/book7.jpg','images/book7.jpg','images/book7.jpg','images/book7.jpg','images/book7.jpg'),
  (NULL,2,'snow','心理学','书籍','计算机相关类','100','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,3,'wangjf','php大全','书籍','计算机相关类','22','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book3.jpg','images/book3.jpg','images/book3.jpg','images/book3.jpg','images/book3.jpg'),
  (NULL,1,'flower','海燕','书籍资料','Java初级','1000','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,1,'flower','海燕','书籍','Java初级','1000','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,1,'flower','海燕3','书籍','Java初级','1000','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,2,'flower','海燕4','书籍','Java初级','1000','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,1,'flower','海燕6','书籍资料','Java初级','1000','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,1,'flower','海燕5','书籍','Java初级','1000','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,1,'flower','海燕8','书籍','Java初级','1000','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,1,'flower','海燕9','书籍资料','Java初级','1000','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,1,'flower','海燕19','书籍资料','Java初级','1000','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,1,'flower','海燕11','书籍','Java初级','1000','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png'),
  (NULL,1,'flower','手机1','电子产品','手机','10','八成新','2017/1/12','三个月',1,'这是一部手机','因为毕业丢了浪费','images/phone1.jpg','images/phone1.jpg','images/phone1.jpg','images/phone1.jpg','images/book.png','images/book.png'),
(NULL,1,'flower','手机2','电子产品','手机','10','八成新','2017/1/12','三个月',1,'这是一部手机','因为毕业丢了浪费','images/phone1.jpg','images/phone1.jpg','images/phone1.jpg','images/phone1.jpg','images/book.png','images/book.png'),
(NULL,1,'flower','手机3','电子产品','手机','10','八成新','2017/1/12','三个月',1,'这是一部手机','因为毕业丢了浪费','images/phone1.jpg','images/phone1.jpg','images/phone1.jpg','images/phone1.jpg','images/book.png','images/book.png'),
(NULL,1,'flower','手机4','电子产品','手机','10','八成新','2017/1/12','三个月',1,'这是一部手机','因为毕业丢了浪费','images/phone1.jpg','images/phone1.jpg','images/phone1.jpg','images/phone1.jpg','images/book.png','images/book.png'),
(NULL,1,'flower','手机5','电子产品','手机','10','八成新','2017/1/12','三个月',1,'这是一部手机','因为毕业丢了浪费','images/phone1.jpg','images/phone1.jpg','images/phone1.jpg','images/phone1.jpg','images/book.png','images/book.png'),
(NULL,2,'snow','手机6','电子产品','手机','10','八成新','2017/1/12','三个月',1,'这是一部手机','因为毕业丢了浪费','images/phone2.jpg','images/phone2.jpg','images/phone2.jpg','images/phone2.jpg','images/book.png','images/book.png'),
(NULL,2,'snow','手机7','电子产品','手机','10','八成新','2017/1/12','三个月',1,'这是一部手机','因为毕业丢了浪费','images/phone2.jpg','images/phone2.jpg','images/phone2.jpg','images/phone2.jpg','images/book.png','images/book.png'),
(NULL,2,'snow','手机8','电子产品','手机','10','八成新','2017/1/12','三个月',1,'这是一部手机','因为毕业丢了浪费','images/phone2.jpg','images/phone2.jpg','images/phone2.jpg','images/phone2.jpg','images/book.png','images/book.png'),
(NULL,2,'snow','手机9','电子产品','手机','10','八成新','2017/1/12','三个月',1,'这是一部手机','因为毕业丢了浪费','images/phone2.jpg','images/phone2.jpg','images/phone2.jpg','images/phone2.jpg','images/book.png','images/book.png'),
(NULL,2,'snow','手机10','电子产品','手机','10','八成新','2017/1/12','三个月',1,'这是一部手机','因为毕业丢了浪费','images/phone2.jpg','images/phone2.jpg','images/phone2.jpg','images/phone2.jpg','images/book.png','images/book.png'),
(NULL,3,'wangjf','手机11','电子产品','手机','10','八成新','2017/1/12','三个月',1,'这是一部手机','因为毕业丢了浪费','images/phone3.jpg','images/phone3.jpg','images/phone3.jpg','images/phone3.jpg','images/book.png','images/book.png'),
(NULL,3,'wangjf','手机12','电子产品','手机','10','八成新','2017/1/12','三个月',1,'这是一部手机','因为毕业丢了浪费','images/phone3.jpg','images/phone3.jpg','images/phone3.jpg','images/phone3.jpg','images/book.png','images/book.png'),
(NULL,3,'wangjf','篮球1','运动专区','篮球','10','八成新','2017/1/12','三个月',1,'这是一个篮球','因为毕业丢了浪费','images/run1.jpg','images/run1.jpg','images/run1.jpg','images/run1.jpg','images/book.png','images/book.png'),
(NULL,2,'snow','骰子','生活娱乐','骰子','10','八成新','2017/1/12','三个月',1,'这是一幅扑克','因为毕业丢了浪费','images/happy1.jpg','images/happy1.jpg','images/happy1.jpg','images/happy1.jpg','images/book.png','images/book.png'),
(NULL,2,'snow','桌子','租赁物品','桌子','10','八成新','2017/1/12','三个月',1,'这是一个桌子','因为毕业丢了浪费','images/rank1.jpg','images/rank1.jpg','images/rank1.jpg','images/rank1.jpg','images/book.png','images/book.png'),
  (NULL,2,'snow','海燕7','书籍','Java初级','1000','八成新','2017/1/12','三个月',1,'这本书是Java基础对Java感兴趣的人可以购买哦','因为毕业丢了浪费','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png','images/book.png');



  CREATE TABLE OldDeal_cart(
    cid INT PRIMARY KEY AUTO_INCREMENT,
    userId INT
  );
  INSERT INTO OldDeal_cart VALUES(100, 1);
  INSERT INTO OldDeal_cart VALUES(101, 2);
  INSERT INTO OldDeal_cart VALUES(102, 3);

  CREATE TABLE OldDeal_cart_detail(
    did INT PRIMARY KEY AUTO_INCREMENT,
    cartId INT,
    productId INT,
    count INT
  );
  INSERT INTO OldDeal_cart_detail VALUES
  (1, 100, 10, 1),
  (2, 100, 15, 1),
  (3, 100, 18, 1),
  (4, 101, 1, 1),
  (5, 101, 9, 1),
  (6, 101, 12, 1),
  (7, 102, 1, 1),
  (8, 102, 3, 1),
  (9, 102, 5, 1);
  CREATE TABLE OldDeal_favorite(
    fid INT PRIMARY KEY AUTO_INCREMENT,
    userId INT
  );
  INSERT INTO OldDeal_favorite VALUES(10, 1);
  INSERT INTO OldDeal_favorite VALUES(11, 2);
  INSERT INTO OldDeal_favorite VALUES(12, 3);
  CREATE TABLE OldDeal_favorite_detail(
    fdid INT PRIMARY KEY AUTO_INCREMENT,
    favoriteId INT,
    productId INT
  );
  INSERT INTO OldDeal_favorite_detail VALUES
  (1, 10, 10),
  (2, 10, 15),
  (3, 10, 18),
  (4, 11, 2),
  (5, 11, 4),
  (6, 11, 6),
  (7, 12, 1),
  (8, 12, 3),
  (9, 12, 5);
  CREATE TABLE OldDeal_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    orderTime bigint,
    price int,
    orderStatus int,
    ownerId int,
    score int,
    comment varchar(1024)
  );
  INSERT INTO OldDeal_order VALUES(102, 2 ,"1488236400",80,2,3,null,null);
  INSERT INTO OldDeal_order VALUES(103, 2 ,"1490364000",100,2,3,null,null);
  INSERT INTO OldDeal_order VALUES(104, 2 ,"1493236400",56,2,3,null,null);


  CREATE TABLE OldDeal_order_detail(
    did INT PRIMARY KEY AUTO_INCREMENT,
    orderId INT,
    productId INT,
    uname varchar(64)
  );
  INSERT INTO OldDeal_order_detail VALUES
  (1, 102, 4,"snow"),
  (2, 103, 12,"snow"),
  (3, 104, 14,"snow");

  create table stuVerify(
  verifyId INT PRIMARY KEY AUTO_INCREMENT,
  verifySchool varchar(64),
  verifyCollege varchar(64),
  stuNumber varchar(64),
  stuName varchar(64)
  );
  INSERT INTO stuVerify VALUES
  (NULL,'中原工学院','软件学院','201370024104','史宁宁'),
  (NULL,'中原工学院','软件学院','201370024203','高雪芳'),
  (NULL,'中原工学院','软件学院','201370024116','王基峰'),
  (NULL,'中原工学院','软件学院','201370024204','夏玉'),
  (NULL,'中原工学院','软件学院','201370024110','赵洋');
  CREATE TABLE stuValidate
  (
    stuId INT PRIMARY KEY AUTO_INCREMENT,
    userId int,
    stuSchool varchar(64),
    stuCollege varchar(64),
    stuNumber varchar(64),
    stuName varchar(64),
    stuImg varchar(64),
    verifyStatus varchar(64)
  );
INSERT INTO stuValidate VALUES
  (NULL,1,'中原工学院','软件学院','201370024104','史宁宁','../img/person.jpg','1'),
  (NULL,2,'中原工学院','软件学院','201370024203','高雪芳','../img/person.jpg','1'),
  (NULL,3,'中原工学院','软件学院','201370024116','王基峰','../img/person.jpg','1'),
  (NULL,4,'中原工学院','软件学院','201370024205','赵洋','../img/person.jpg','1');
  CREATE TABLE wantBuy
  (
    wbid INT PRIMARY KEY AUTO_INCREMENT,
    uname varchar(64),
    pname varchar(64),
    pdesc varchar(64),
    wantPrice int,
    wantBuyTime BIGINT,
    eTime int,
    buyStatus int
  );
  INSERT INTO wantBuy VALUES
  (1,'flower','书包','新的',30,1531261513,10,1),
  (2,'snow','眼镜盒','新的',2,1531211513,10,1),
  (3,'wangjf','键盘','新的',30,1531321513,10,1),
  (4,'snow','眼镜盒','新的',2,1531214513,10,2);

  CREATE TABLE report
  (
    rid INT PRIMARY KEY AUTO_INCREMENT,
    tipName varchar(64),
    uname varchar(64),
    pname varchar(64),
    reason varchar(200),
    tipTime int,
    tipStatus int,
    cancel varchar(512)
  );
  INSERT INTO report VALUES
    (1,'flower','snow','JAVA书','假的',1531261513,1,"");
  CREATE TABLE soldOrder
    (
      sid INT PRIMARY KEY AUTO_INCREMENT,
      soid INT,
      spname varchar(64),
      spid INT,
      pic1 varchar(64),
      sprice varchar(32),
      sdate dateTime,
      sname varchar(64),
      sbname varchar(64),
      status INT
    );
    INSERT INTO soldOrder VALUES
        (1,'204','有梦不觉人生寒',100,'imgage/book.png','300','2017-04-12','flower','snow',3),
        (2,'205','软件工程',101,'imgage/book.png','600','2017-03-15','flower','snow',3);
     CREATE TABLE manager
      (
        mid INT PRIMARY KEY AUTO_INCREMENT,
        mname varchar(64),
        mpwd varchar(64),
        rootLevel int
      );
      INSERT INTO manager VALUES
      (1,'wangjf','123456',2),
      (2,'snow','123456',1),
      (3,'flower','123456',1);
      CREATE TABLE payChart
            (
              userId INT,
              month1 int,
              month2 int,
              month3 int,
              month4 int,
              month5 int,
              month6 int,
              month7 int,
              month8 int,
              month9 int,
              month10 int,
              month11 int,
              month12 int
            );
  CREATE TABLE INTEGRAL(
    inId INT PRIMARY KEY AUTO_INCREMENT,
    behavior varchar(256),
    step varchar(256)
  );
  INSERT INTO INTEGRAL VALUES
        (1,'购物成功','+10 不限次数'),
        (2,'发布商品','+10 不限次数'),
        (3,'售出商品','+10 不限次数'),
        (4,'注册成功','+10 仅限首次'),
        (5,'有效交易评价','+5 不限次数 '),
        (6,'发布求购','+10 不限次数')
        ;