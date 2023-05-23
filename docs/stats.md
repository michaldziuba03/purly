## Statistics architecture (draft)
When user clicks link we want to redirect them and also track number of redirections.

### ClickHouse Database
I decided to try database **DESIGNED** for aggregating high volume data like link clicks.

Current schema I plan to introduce is very simple.
```sql
CREATE TABLE clicks
(
    alias String,
    timestamp Date,
    referer String,
    browser String,
    os String,
    country String
)
ENGINE = MergeTree
PRIMARY KEY (alias, timestamp)
```

 I have no idea how to perform batch processing with BullMQ like in Kafka (well, actually it's possible only in [BullMQ Pro Batches processing](https://docs.bullmq.io/bullmq-pro/batches)) - but I don't want to introduce Kafka so I decided to use async inserts so ClickHouse database will buffer all inserts and flash them to disk on interval. It's fine for me. 
 
Clicks for last 30 days query for link with alias `X92Am`:
```sql
SELECT
    timestamp,
    count(timestamp) AS views
FROM clicks
WHERE alias = 'X92Am'
GROUP BY timestamp
ORDER BY timestamp DESC WITH FILL STEP -1
LIMIT 30
```
```
┌──timestamp─┬─views─┐
│ 2023-05-22 │    10 │
│ 2023-05-21 │     3 │
│ 2023-05-20 │     0 │
│ 2023-05-19 │     2 │
│ 2023-05-18 │     1 │
│ 2023-05-17 │     0 │
│ 2023-05-16 │     0 │
│ 2023-05-15 │     0 │
│ 2023-05-14 │     0 │
│ 2023-05-13 │     0 │
│ 2023-05-12 │     0 │
│ 2023-05-11 │     0 │
│ 2023-05-10 │     0 │
│ 2023-05-09 │     0 │
│ 2023-05-08 │     0 │
│ 2023-05-07 │     0 │
│ 2023-05-06 │     1 │
│ 2023-05-05 │     0 │
│ 2023-05-04 │     2 │
└────────────┴───────┘
```


### Details how to get device information
1. I plan to get IP location with library [geoip-country
](https://www.npmjs.com/package/geoip-country)
2. I plan to get info like OS, Browser by parsing `User-Agent` header with library [ua-parser-js](https://www.npmjs.com/package/ua-parser-js)
