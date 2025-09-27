INSERT INTO role_entity (id, role_name) VALUES ('1', 'ADMIN');
insert into ROLE_ENTITY(ID, ROLE_NAME)
values ('2', 'USER');



INSERT INTO user_entity (id, username, email, password, role_id) VALUES
  ('5eca874a-62ce-3125-90bd-02ec0b6401c3', 'Admin', 'test.admin@hotmail.com', '$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe', '1');
INSERT INTO user_entity (id, username, email, password, role_id) VALUES
  ('5eca872a-62ce-3125-90bd-02ec0b6401c3', 'User',  'test.user@hotmail.com', '$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe', '2');

INSERT INTO dashboard_entity (id, user_Id) VALUES ('ebe1ef42-6b9e-44df-8d23-dabd421a387e', '5eca874a-62ce-3125-90bd-02ec0b6401c3');

-- FOR TESTS  
insert into USER_ENTITY(ID, USERNAME, EMAIL, PASSWORD, ROLE_ID) values ('5eca870a-62ce-3125-90bd-02ec0b6401c3', 'UserForTest1', 'test.user1@test.com', '$2a$10$Uv/aT7CEsvsM08Cr7jVIsOnOYrDMGZar5SIMZqjBjs.s.o9XZeA5C', '2');
insert into USER_ENTITY(ID, USERNAME, EMAIL, PASSWORD, ROLE_ID) values ('5eca868a-62ce-3125-90bd-02ec0b6401c3', 'UserForTest2', 'test.user2@test.com', '$2a$10$Uv/aT7CEsvsM08Cr7jVIsOnOYrDMGZar5SIMZqjBjs.s.o9XZeA5C', '2');

INSERT INTO PORTFOLIO_ENTITY (
  CASH_BALANCE, 
  CASH_INTEREST_RATE, 
  INITIAL_INTEREST_PAYMENT_DATE, 
  INTEREST_PAYMENT_FREQUENCY_PER_YEAR, 
  NAME, 
  DESCRIPTION,
  CURRENCY_TYPE, 
  ID,
  USER_ID
)
VALUES
    (2000,1,'2020-10-10',1,'Test','Test User 1','USD','40554b53-6ce1-333d-96ab-c854631d04f8','5eca870a-62ce-3125-90bd-02ec0b6401c3'),
    (2000,1,'2020-10-10',1,'Test','Test User 2','USD','40554b53-6ce1-444d-96ab-c854631d04f8','5eca868a-62ce-3125-90bd-02ec0b6401c3'); 


--///////////////////////////////// USER

INSERT INTO PORTFOLIO_ENTITY (
  CASH_BALANCE, 
  CASH_INTEREST_RATE, 
  INITIAL_INTEREST_PAYMENT_DATE, 
  INTEREST_PAYMENT_FREQUENCY_PER_YEAR, 
  NAME, 
  DESCRIPTION,
  CURRENCY_TYPE, 
  ID,
  USER_ID
)
VALUES
    (2000,1,'2020-10-10',1,'Desjardins','Any desc','USD','40554b53-6ce1-425d-96ab-c854631d04f8','5eca872a-62ce-3125-90bd-02ec0b6401c3'); 


INSERT INTO Tag_Entity (id, user_id, name, hex_Color)
VALUES
    ('57c31e9d-1b15-4686-8114-38de48ad887e', '5eca872a-62ce-3125-90bd-02ec0b6401c3', 'Crypto tag', 16711680), 
    ('02b8144e-2bb7-4fc2-b132-135c560bbe13', '5eca872a-62ce-3125-90bd-02ec0b6401c3', 'Celi tag', 65280),   
    ('fee429f7-9f49-44ee-bf09-9923aef937fd', '5eca872a-62ce-3125-90bd-02ec0b6401c3', 'Stock tag', 65880),
    ('14789068-a5b4-4a15-9db5-066619aea0a5', '5eca872a-62ce-3125-90bd-02ec0b6401c3', 'Ressource tag', 52880);

INSERT INTO CRYPTO_ASSET_ENTITY (QUANTITY, BUY_DATE, UNIT_PURCHASE_PRICE, DESCRIPTION, ID, NAME, PORTFOLIO_ID, SYMBOL)
VALUES(2,'2020-02-10', 10, 'Bitcoin', '14cbbea8-5ddb-4434-b1e0-598a5167be31', 'Bitcoin crypto asset', '40554b53-6ce1-425d-96ab-c854631d04f8', 'BTC-USD'),
      (13,'2021-03-03', 1301.30, 'Ethereum', '22cbbea8-5ddb-4434-b1e0-598a5167be31', ' crypto asset', '40554b53-6ce1-425d-96ab-c854631d04f8', 'ETH-USD');
INSERT INTO CRYPTO_ASSET_TAG_ENTITY (ASSET_ID, TAG_ID, USER_ID)
VALUES
    ('14cbbea8-5ddb-4434-b1e0-598a5167be31','57c31e9d-1b15-4686-8114-38de48ad887e', '5eca872a-62ce-3125-90bd-02ec0b6401c3'), 
    ('22cbbea8-5ddb-4434-b1e0-598a5167be31','02b8144e-2bb7-4fc2-b132-135c560bbe13', '5eca872a-62ce-3125-90bd-02ec0b6401c3'); 

INSERT INTO STOCK_ASSET_ENTITY (QUANTITY, BUY_DATE, UNIT_PURCHASE_PRICE, DESCRIPTION, ID, NAME, PORTFOLIO_ID, SYMBOL)
VALUES(10.1,'2023-01-01', 10000, 'Apple stock asset', '4b899463-ae84-40e9-ad13-3dcb7a9f98bc', 'Apple', '40554b53-6ce1-425d-96ab-c854631d04f8', 'AAPL'),
      (13.5,'2021-03-03', 1220, 'Smp 500 stock asset', '416bc364-07ef-4495-b222-d856e3c333e1', 'SMP', '40554b53-6ce1-425d-96ab-c854631d04f8', '^GSPC');
INSERT INTO STOCK_ASSET_TAG_ENTITY (ASSET_ID, TAG_ID, USER_ID)
VALUES
    ('4b899463-ae84-40e9-ad13-3dcb7a9f98bc','fee429f7-9f49-44ee-bf09-9923aef937fd', '5eca872a-62ce-3125-90bd-02ec0b6401c3'),  --Stock tag
    ('416bc364-07ef-4495-b222-d856e3c333e1','fee429f7-9f49-44ee-bf09-9923aef937fd', '5eca872a-62ce-3125-90bd-02ec0b6401c3');  --Stock tag

INSERT INTO RESSOURCE_ASSET_ENTITY (QUANTITY, BUY_DATE, UNIT_PURCHASE_PRICE, DESCRIPTION, ID, NAME, PORTFOLIO_ID, RESSOURCE_TYPE)
VALUES(21,'2021-02-13', 50, 'Gold ressource asset', 'a590a7ee-f63e-4e77-85a2-b2c3e5730411', 'Gold', '40554b53-6ce1-425d-96ab-c854631d04f8', 'GOLD'),
      (10,'2017-05-15', 300, 'Silver ressource asset', '2241cd35-c329-4bae-919f-93d1e0b0b3bf', 'Silver', '40554b53-6ce1-425d-96ab-c854631d04f8', 'SILVER');
INSERT INTO RESSOURCE_ASSET_TAG_ENTITY (ASSET_ID, TAG_ID, USER_ID)
VALUES
    ('a590a7ee-f63e-4e77-85a2-b2c3e5730411','14789068-a5b4-4a15-9db5-066619aea0a5', '5eca872a-62ce-3125-90bd-02ec0b6401c3'), --Ressource tag 
    ('2241cd35-c329-4bae-919f-93d1e0b0b3bf','14789068-a5b4-4a15-9db5-066619aea0a5', '5eca872a-62ce-3125-90bd-02ec0b6401c3'),  --Ressource tag 
    ('a590a7ee-f63e-4e77-85a2-b2c3e5730411','02b8144e-2bb7-4fc2-b132-135c560bbe13', '5eca872a-62ce-3125-90bd-02ec0b6401c3'); --Celi tag

--///////////////////////////////// ADMIN

INSERT INTO PORTFOLIO_ENTITY (
  CASH_BALANCE, 
  CASH_INTEREST_RATE, 
  INITIAL_INTEREST_PAYMENT_DATE, 
  INTEREST_PAYMENT_FREQUENCY_PER_YEAR, 
  NAME, 
  DESCRIPTION,
  CURRENCY_TYPE, 
  ID,
  USER_ID
)
VALUES
    (3000,0.3,'2019-09-10',300, 'Crypto portfolio','crypt desc','CAD','3eabac57-a961-43f4-ac9f-c4f7eb111d69','5eca874a-62ce-3125-90bd-02ec0b6401c3'); /*USER*/

-- /*TAG FOR ADMIN*/

INSERT INTO Tag_Entity (id, user_id, name, hex_Color)
VALUES
    ('b3d48527-dd7d-43a3-b7f5-4293d28c7d1c', '5eca874a-62ce-3125-90bd-02ec0b6401c3', 'Ethereum tag', 16711680), 
    ('a4dc3c55-9cb3-4a5a-8e2e-2ced5abb8ec6', '5eca874a-62ce-3125-90bd-02ec0b6401c3', 'REER tag', 633330),   
    ('75073d53-dba5-4bdb-8fcc-802fde7d1d88', '5eca874a-62ce-3125-90bd-02ec0b6401c3', 'Microsoft tag', 965435),
    ('1ca952af-0c38-4754-abf9-08bbd35e018f', '5eca874a-62ce-3125-90bd-02ec0b6401c3', 'GOLD tag', 323455);   


INSERT INTO distribution_widget_entity(id, dashboard_Id,name,width,widget_type,posy,posx,height) 
 VALUES ('dcbba062-ec65-477d-ba09-b2c0bf044eae', 'ebe1ef42-6b9e-44df-8d23-dabd421a387e', 'any name', 1, 0,1,1,1);
 INSERT INTO tag_entity_widgets(tags_id, tags_user_id, widgets_id) 
 VALUES ('75073d53-dba5-4bdb-8fcc-802fde7d1d88', '5eca874a-62ce-3125-90bd-02ec0b6401c3', 'dcbba062-ec65-477d-ba09-b2c0bf044eae'),
        ('1ca952af-0c38-4754-abf9-08bbd35e018f', '5eca874a-62ce-3125-90bd-02ec0b6401c3', 'dcbba062-ec65-477d-ba09-b2c0bf044eae');

INSERT INTO CRYPTO_ASSET_ENTITY (QUANTITY, BUY_DATE, UNIT_PURCHASE_PRICE, DESCRIPTION, ID, NAME, PORTFOLIO_ID, SYMBOL)
VALUES(2,'2022-02-17', 15, 'nft', '6a2b6922-bb15-4267-8d85-33f455f22c63', 'Nft crypto asset', '3eabac57-a961-43f4-ac9f-c4f7eb111d69', 'NFTY'),
      (3,'2020-05-05', 305.30, 'Bitcash', 'f897894a-545e-4802-8482-d1b21104b5b7', 'Bitcash crypto asset', '3eabac57-a961-43f4-ac9f-c4f7eb111d69', 'BTSG');
INSERT INTO CRYPTO_ASSET_TAG_ENTITY (ASSET_ID, TAG_ID, USER_ID)
VALUES
    ('6a2b6922-bb15-4267-8d85-33f455f22c63','b3d48527-dd7d-43a3-b7f5-4293d28c7d1c', '5eca874a-62ce-3125-90bd-02ec0b6401c3');

INSERT INTO STOCK_ASSET_ENTITY (QUANTITY, BUY_DATE, UNIT_PURCHASE_PRICE, DESCRIPTION, ID, NAME, PORTFOLIO_ID, SYMBOL)
VALUES(9,'2009-01-01', 900, 'Microsoft stock asset', '9df2a986-e642-44ad-80cc-cf4469040706', 'Microsoft', '3eabac57-a961-43f4-ac9f-c4f7eb111d69', 'MSFT'),
      (17,'2024-01-01', 1000, 'Smp 500 stock asset', '2bdc2c68-a833-4c8f-b05d-3145fe46ec42', 'SMP', '3eabac57-a961-43f4-ac9f-c4f7eb111d69', '^GSPC');
INSERT INTO STOCK_ASSET_TAG_ENTITY (ASSET_ID, TAG_ID, USER_ID)
VALUES
    ('9df2a986-e642-44ad-80cc-cf4469040706','75073d53-dba5-4bdb-8fcc-802fde7d1d88', '5eca874a-62ce-3125-90bd-02ec0b6401c3'),  
    ('2bdc2c68-a833-4c8f-b05d-3145fe46ec42','a4dc3c55-9cb3-4a5a-8e2e-2ced5abb8ec6', '5eca874a-62ce-3125-90bd-02ec0b6401c3');  

INSERT INTO RESSOURCE_ASSET_ENTITY (QUANTITY, BUY_DATE, UNIT_PURCHASE_PRICE, DESCRIPTION, ID, NAME, PORTFOLIO_ID, RESSOURCE_TYPE)
VALUES(500,'2021-02-13', 10, 'Gold ressource asset', '4a371faf-dfe4-4e95-aa03-49c90440e214', 'Gold', '3eabac57-a961-43f4-ac9f-c4f7eb111d69', 'GOLD'),
      (10,'2017-05-15', 300, 'Silver ressource asset', 'e8f2066d-d49f-4d07-8fa7-8905d1c0af65', 'Silver', '3eabac57-a961-43f4-ac9f-c4f7eb111d69', 'SILVER');
INSERT INTO RESSOURCE_ASSET_TAG_ENTITY (ASSET_ID, TAG_ID, USER_ID)
VALUES
    ('4a371faf-dfe4-4e95-aa03-49c90440e214','1ca952af-0c38-4754-abf9-08bbd35e018f', '5eca874a-62ce-3125-90bd-02ec0b6401c3'), 
    ('e8f2066d-d49f-4d07-8fa7-8905d1c0af65','1ca952af-0c38-4754-abf9-08bbd35e018f', '5eca874a-62ce-3125-90bd-02ec0b6401c3'),  
    ('e8f2066d-d49f-4d07-8fa7-8905d1c0af65','a4dc3c55-9cb3-4a5a-8e2e-2ced5abb8ec6', '5eca874a-62ce-3125-90bd-02ec0b6401c3'); 
