CREATE TABLE IF NOT EXISTS clicks (
    link_id String,
    timestamp Date,
    referer String,
    browser String,
    os String,
    country String
)
ENGINE = MergeTree
ORDER BY (link_id, timestamp);
