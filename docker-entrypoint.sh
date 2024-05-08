#!/bin/sh

/usr/local/bin/dockerize -wait tcp://db:5432 -timeout 20s

npm run build

npm run start:prod
