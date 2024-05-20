use dev;

SET @query_name = '%배곧%';
SET @query_start = "2023-12-20 17:28:06";
SET @query_end = "2024-01-15 12:27:14";
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
AND m.date < @query_end 
;

select count(*) from region where high_id = 2;

select * from region where high_id = 
(select id from region  where name like"진주%");

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

select * from message join message_region on message.id = message_region.msg_id join region on region.id = message_region.region_id where date(date) = '2024-05-19';

-- /dsmap/location/level/1 (POST) 
-- 2레벨 x,y 좌표
-- /dsmap/message/level/1 (POST) 
-- 1,2,3 별 메시지
-- /dsmap/location/level/2 (POST)
-- 3레벨 x,y 좌표
-- /dsmap/message/level/2 (POST) 
-- 2,3 별 메시지 

set @start_date = '2024-05-09';
set @end_date = '2024-05-19';
set @name = '달서구%';

select * from message 
join message_region on message.id = message_region.msg_id 
join region on region.id = message_region.region_id
where region.level = 2
and name like @name
and date(message.date) between @start_date and @end_date;

select * from message 
join message_region on message.id = message_region.msg_id 
join region on region.id = message_region.region_id
where region.level = 3
and high_id = (select id from region where level = 2 AND name like @name)
and date(message.date) between @start_date and @end_date;

select * from message 
join message_region on message.id = message_region.msg_id 
join region on region.id = message_region.region_id
and date(message.date) between @start_date and @end_date;









