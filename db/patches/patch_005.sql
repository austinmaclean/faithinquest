create table search_request (
    id varchar(255) not null,
    amount int4 not null,
    last_searched timestamp,
    primary key (id)
);

insert into patch_log (version) values (5);