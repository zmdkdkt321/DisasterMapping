use dev;

SET @query_name = '%배곧%';
SET @query_start = "2024-5-10 17:28:06";
SET @query_end = "2024-05-19 12:27:14";
SET @query_today = '2024-05-18';
SET @query_level = 3;

-- /dsmap/message/total/  (GET)
select r.name, t.count from  today_total as t join region as r on t.region_id=r.id order by region_id;

-- /dsmap/message/total/”{city_name, level}” (GET)
select * from message 
join message_region on message.id = message_region.msg_id 
join region on region.id = message_region.region_id 
where region.level = @query_level 
AND region.name like @query_name 
AND date(message.date) = @query_today; #CURRENT_DATE()

-- /dsmap/message (POST) 

-- 1. message x message_region x region
SELECT m.*
FROM message m
JOIN message_region mr ON m.id = mr.msg_id
JOIN region r ON mr.region_id = r.id
WHERE r.name LIKE @query_name
AND m.date > @query_start 
AND m.date < @query_end;

-- 2. message + message_region x region
SELECT * 
FROM message 
WHERE date BETWEEN @query_start AND @query_end
and id IN 
(
    select msg_id
	from message_region as mr 
    JOIN region as r
    ON mr.region_id = r.id 
	where r.name like @query_name
);


select * from message where date(date) = '2024-05-19';

SET @query_name = '%경상남도%';
-- /dsmap/location/level/1 (POST)
-- 2레벨 x,y 좌표
select low.name, low.x, low.y 
from region as low 
join region as high on low.high_id = high.id 
where high.name like @query_name AND low.level = 2;


SET @query_name = '%경상남도%';
SET @query_start = "2024-5-10";
SET @query_end = "2024-05-19";
-- /dsmap/message/level/1 (POST) 
-- 1,2,3 별 메시지
SELECT  r.name, r.level, NULL as high_name, m.*
FROM message m
JOIN message_region mr ON m.id = mr.msg_id
JOIN region r ON mr.region_id = r.id
WHERE r.name LIKE @query_name
AND m.date > @query_start 
AND m.date < @query_end
UNION
SELECT  r.name, r.level, h.name as high_name, m.*
FROM message m
JOIN message_region mr ON m.id = mr.msg_id
JOIN region r ON mr.region_id = r.id
JOIN region h ON r.high_id = h.id
WHERE h.name LIKE @query_name
AND m.date > @query_start 
AND m.date < @query_end
UNION
SELECT  r.name, r.level, h.name as high_name, m.*
FROM message m
JOIN message_region mr ON m.id = mr.msg_id
JOIN region r ON mr.region_id = r.id
JOIN region h ON r.high_id = h.id
WHERE h.id in (select r.id from region r JOIN region h ON r.high_id = h.id where h.name like @query_name)
AND m.date > @query_start 
AND m.date < @query_end;

SELECT
    r.name,r.level, h.name AS high_name,m.*
FROM message m
JOIN message_region mr ON m.id = mr.msg_id
JOIN region r ON mr.region_id = r.id
LEFT JOIN region h ON r.high_id = h.id
WHERE
    (r.name LIKE @query_name OR h.name LIKE @query_name OR h.id IN (SELECT r.id FROM region r JOIN region h ON r.high_id = h.id WHERE h.name LIKE @query_name))
    AND m.date > @query_start
    AND m.date < @query_end
order by level;

SET @query_name = '%진주시%';
-- /dsmap/location/level/2 (POST)
-- 3레벨 x,y 좌표
select low.name, low.x, low.y 
from region as low 
join region as high on low.high_id = high.id 
where high.name like @query_name AND low.level = 3;



-- /dsmap/message/level/2 (POST)
-- 2,3 별 메시지 

set @start_date = '2024-05-09';
set @end_date = '2024-05-19';
set @name = '달서구%';



