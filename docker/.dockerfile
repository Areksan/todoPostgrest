FROM postgres:14-bullseye
RUN apt-get update -y\
    && apt-get install postgresql-server-dev-14 -y

RUN apt-get install git -y\
    && apt-get install make

RUN git clone https://github.com/michelp/pgjwt.git  \
    && cd pgjwt \
    && make install

RUN mkdir -p /docker-entrypoint-initdb.d

COPY ./test.sql /test.sql
COPY ./initdbPostgrest.sh /docker-entrypoint-initdb.d