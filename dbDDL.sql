use dev;

CREATE TABLE message
(
     id INT PRIMARY KEY,
     content VARCHAR(500),
     date DATETIME NOT NULL
);

CREATE TABLE region
(
     id INT PRIMARY KEY,
     name VARCHAR(50),
     level INT NOT NULL,
     high_id INT,
     court_code INT,
     x FLOAT,
     y FLOAT
);

CREATE TABLE message_region
(
     region_id INT,
     msg_id INT,
     FOREIGN KEY(msg_id) REFERENCES message(id),
     FOREIGN KEY(region_id) REFERENCES region(id),
     PRIMARY KEY(region_id, msg_id)
);


CREATE TABLE today_total (
    region_id INT PRIMARY KEY,
    count INT,
    FOREIGN KEY (region_id) REFERENCES region(id)
);

INSERT INTO today_total SELECT id,0 FROM region WHERE level = 1;


CREATE VIEW region_lv1_lv2 AS 
(
    SELECT 
        region_lv1.id AS lv1_id, 
        region_lv1.name AS lv1_name,
        region_lv2.id AS lv2_id, 
        region_lv2.name AS lv2_name
    FROM 
        (SELECT id, name FROM region WHERE level = 1) AS region_lv1 
    LEFT JOIN
        (SELECT id, name, high_id FROM region WHERE level = 2) AS region_lv2
    ON region_lv1.id = region_lv2.high_id
);


CREATE VIEW region_lv1_lv3 AS 
(
    SELECT 
        region_lv1.id AS lv1_id, 
        region_lv1.name AS lv1_name,
        region_lv3.id AS lv3_id, 
        region_lv3.name AS lv3_name
    FROM 
        (SELECT id, name FROM region WHERE level = 1) AS region_lv1
    LEFT JOIN
        (SELECT id, name, high_id FROM region WHERE level = 2) AS region_lv2 
    ON region_lv1.id = region_lv2.high_id 
    LEFT JOIN
        (SELECT id, name, high_id FROM region WHERE level = 3) AS region_lv3    
    ON region_lv2.id = region_lv3.high_id
);

DELIMITER // 
CREATE PROCEDURE protest(IN msg_id INT)
BEGIN
    UPDATE today_total 
    SET count = count + 1  
    WHERE local_id IN
    (
        SELECT id AS lv1_id
        FROM region 
        WHERE id IN (SELECT region_id FROM message_region WHERE message_id = msg_id) AND level = 1
        
        UNION
        
        SELECT lv1_id 
        FROM region_lv1_lv2
        WHERE lv2_id IN (SELECT region_id FROM message_region WHERE message_id = msg_id)
        
        UNION
        
        SELECT lv1_id
        FROM region_lv1_lv3
        WHERE lv3_id IN (SELECT region_id FROM message_region WHERE message_id = msg_id)
    );
END //
DELIMITER ;

CREATE EVENT init_total
ON SCHEDULE EVERY 1 DAY
    STARTS '2024-05-18 00:00:00'
DO 
update total set count =0 where 1=1;
