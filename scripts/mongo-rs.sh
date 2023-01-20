#!/bin/bash
sleep 5
mongosh <<EOF
var config = {
    "_id": "rs",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "127.0.0.1:27017"
        },
        {
            "_id": 2,
            "host": "127.0.0.1:27018"
        },
        {
            "_id": 3,
            "host": "127.0.0.1:27019"
        }
    ]
};
rs.initiate(config);
rs.status();
EOF
