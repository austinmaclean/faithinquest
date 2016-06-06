
    create table admin (
        id int8 not null,
        email varchar(255),
        first_name varchar(255),
        last_name varchar(255),
        password varchar(255),
        primary key (id)
    );

    alter table admin 
        add constraint uk_admin_email  unique (email);

    create sequence hibernate_sequence;
