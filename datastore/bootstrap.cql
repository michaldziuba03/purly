CREATE KEYSPACE shorturl_keyspace WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
USE shorturl_keyspace;
CREATE TABLE mappings (short_token VARCHAR PRIMARY KEY, url TEXT, counter bigint, created_at timestamp);