## Statisitcs architecture (draft)
When user clicks link we want to redirect them and also track number of redirections.

### Stats schema to reduce cost of reads
As I consider click as high volume event - I don't want to store each event individually and then perform aggregation. What I want to do is basically store pre-computed stats on daily basis and then aggregate smaller dataset for last 30 days.
> `stats` collection
```json
{
  "timestamp": "19-05-2023",
  "aliasRef": "aaMz2",
  "total": 340,
  "countries": {
    "PL": 201,
    "EN": 105,
    "UK": 3,
    "RU": 5,
    "IL": 26
  },
  "os": {
    "linux": 3,
    "android": 43,
    "windows": 270,
    "macos": 34
  },
  "browsers": {
    "chrome": 302,
    "firefox": 38
  }
},
"createdAt": "2023-05-19T13:50:50.375+00:00",
"updatedAt": "2023-05-19T16:30:26.375+00:00"
```
`timestamp` & `aliasRef` will be compound unique index and data will be updated with upsert.

### Queue usage to reduce number of writes
I plan to utilize BullMQ and delay feature + cache to reduce number of writes. 

1. User clicks link
2. Application updates cached stats for specific day "stats:aaMz2:19-05-2023". I think HASH will be most convenient data type for storing this in Redis.
3. Application assigns unique job id "stats:aaMz2:19-05-2023" and put job to the queue with defined delay. I want to use [Throttle pattern](https://docs.bullmq.io/patterns/throttle-jobs) to ensure that one job will be inserted to queue (for example if single link gets 2000 click, only 1 event will be inserted to queue in specific time span).
4. Worker will persist cached stats in MongoDB

### Problems with my design
1. Hard to ensure idempotence in queues - job can be processed multiple times so in some cases application may show inaccurate stats.
2. Possible data loss for cache - longer delay before updating = bigger data loss.
