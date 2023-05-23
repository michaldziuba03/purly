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
    count(*) as views 
FROM clicks 
WHERE alias='X92Am' 
GROUP BY timestamp 
ORDER BY timestamp DESC 
LIMIT 30
```

![image](https://github.com/michaldziuba03/url-shortener/assets/43048524/9254fb1c-b886-4348-a3bd-c0c6918d656b)


### Details how to get device information
1. I plan to get IP location with library [geoip-country
](https://www.npmjs.com/package/geoip-country)
2. I plan to get info like OS, Browser by parsing `User-Agent` header with library [ua-parser-js](https://www.npmjs.com/package/ua-parser-js)
