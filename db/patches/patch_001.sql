-- First
create table study (
    id int8 not null,
    created timestamp not null,
    description varchar(255),
    link varchar(255) not null,
    speaker varchar(255),
    start_min int4 not null,
    start_sec int4 not null,
    title varchar(255) not null,
    primary key (id)
);

create sequence study_seq start 1 increment 1;

insert into patch_log (version) values (1);