CREATE TABLE IF NOT EXISTS clicks_sources (
    link_id String,
    timestamp Date,
    referer String,
    browser String,
    os String,
    country String,
    hits AggregateFunction(count, UInt64)
)
ENGINE = AggregatingMergeTree
ORDER BY (link_id, timestamp);

CREATE MATERIALIZED VIEW IF NOT EXISTS clicks_sources_mv
TO clicks_sources
AS
SELECT
    link_id,
    timestamp,
    referer,
    browser,
    os,
    country,
    countState() AS hits
FROM clicks
GROUP BY
    link_id,
    timestamp,
    referer,
    browser,
    os,
    country,
    timestamp;
