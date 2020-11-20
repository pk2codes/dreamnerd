# Dreamnerd


## Setup DB
load postgres

`docker pull postgres`

make persistent folder

`mkdir -p $HOME/docker/volumes/postgres`

run

`docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres`
 

Create Database

`psql -h localhost -U postgres -d postgres -c 'create database dreamnerd'`

connect to db using cli

`psql -h localhost -U postgres -d dreamnerd`
## Build
`npm i`

`npm run build`

## Run
`node ./build/index.ts`

## PostgreSQL Tips

CLI Connect

`psql -h localhost -U postgres -d postgres`

List Databases

`\list`

Create DB

`CREATE DATABASE name;`