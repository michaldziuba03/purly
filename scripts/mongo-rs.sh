#!/bin/bash
(sleep 10 && mongosh --host localhost --port 27017 --eval "rs.initiate()") &
mongod --bind_ip localhost,mongo1 --replSet rs
