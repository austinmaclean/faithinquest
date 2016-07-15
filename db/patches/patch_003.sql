create table attachment (
    id int8 not null,
    content_type varchar(255),
    description varchar(255),
    duration int8,
    file_name varchar(255),
    uploaded timestamp,
    primary key (id)
);

create table slide (
    id int8 not null,
    index_number int4 not null,
    link varchar(255),
    id_attachment int8,
    primary key (id)
);

alter table slide
  add constraint fk_carousel_slide_attachment
  foreign key (id_attachment)
  references attachment;

create sequence attachment_seq start 1 increment 1;

create sequence slide_seq start 1 increment 1;

insert into patch_log (version) values (3);