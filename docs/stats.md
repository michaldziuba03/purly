## Statistics architecture (draft)
When user clicks link we want to redirect them and also track number of redirections.

### ClickHouse Database
I decided to try database **DESIGNED** for aggregating high volume data like link clicks.

Current schema I plan to introduce is very simple.
```sql
CREATE TABLE stats
(
    alias String,
    timestamp DateTime,
    referer String,
    os String,
    country String
)
ENGINE = MergeTree
PRIMARY KEY (alias, timestamp)
```

 I have no idea how to perform batch processing with BullMQ like in Kafka - but I don't want to introduce Kafka so I decided to use async inserts so ClickHouse database will buffer all inserts and flash them to disk on interval. It's fine for me. 

### Details how to get device information
1. I plan to get IP location with library [geoip-country
](https://www.npmjs.com/package/geoip-country)
2. I plan to get info like OS, Browser by parsing `User-Agent` header with library [ua-parser-js](https://www.npmjs.com/package/ua-parser-js)
