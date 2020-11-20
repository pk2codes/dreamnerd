# Dreamnerd


## Setup DB
load postgres

`docker pull postgres`

make persistent folder

`mkdir -p $HOME/docker/volumes/postgres`

run

`docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres`
 

test connection

`psql -h localhost -U postgres -d postgres`

## Build
`npm i`

`npm run build`

## Run
`node ./build/index.ts`

