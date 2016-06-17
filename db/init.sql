/*!40101 SET NAMES utf8 */;
CREATE DATABASE faithinquest
  WITH OWNER = postgres
       ENCODING = 'UNICODE'
       TABLESPACE = pg_default
       CONNECTION LIMIT = -1;

ALTER DATABASE faithinquest SET timezone TO 'UTC';

\c faithinquest

create table patch_log (
  applied TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  version integer
);

insert into patch_log (version) values (0);
