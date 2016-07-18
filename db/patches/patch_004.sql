alter table study add column views_count int4 not null default 0;

insert into patch_log (version) values (4);