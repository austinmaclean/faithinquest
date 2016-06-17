
    create table admin (
        id int8 not null,
        email varchar(255),
        first_name varchar(255),
        last_name varchar(255),
        password varchar(255),
        primary key (id)
    );

    create table study (
        id int8 not null,
        created timestamp not null,
        description varchar(5120),
        link varchar(255) not null,
        speaker varchar(255),
        start_min int4 not null,
        start_sec int4 not null,
        title varchar(255) not null,
        primary key (id)
    );

    alter table admin 
        add constraint uk_admin_email  unique (email);

    create sequence hibernate_sequence;

    create sequence study_seq start 1 increment 1;
