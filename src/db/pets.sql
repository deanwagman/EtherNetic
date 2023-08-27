INSERT INTO pets (name, type, stage)
VALUES ('Draco', 'Dragon', 'Baby');



id              | integer                     |           | not null | nextval('pets_id_seq'::regclass)
 user_id         | integer                     |           |          | 
 name            | character varying(255)      |           | not null | 
 type            | character varying(50)       |           | not null | 
 hunger_level    | integer                     |           |          | 100
 happiness_level | integer                     |           |          | 100
 last_interacted | timestamp without time zone |           |          | CURRENT_TIMESTAMP
 birth_date      | timestamp without time zone |           |          | CURRENT_TIMESTAMP
 death_date      | timestamp without time zone |           |          | 
 stage           | character varying(50)  