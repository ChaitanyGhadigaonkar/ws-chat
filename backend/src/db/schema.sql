CREATE TYPE status AS ENUM ('online', 'offline');

CREATE TABLE users (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT,
	profile_picture TEXT,
	status status DEFAULT 'offline',
	last_seen TIMESTAMP,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
INSERT INTO users (
	name,
	email,
	password
) VALUES (
	'CHINMAY GHADIGONKAR',
	'CHINMAY@GMAIL.COM',
	'PASSWORD'
);

SELECT * FROM users;

CREATE TABLE messages (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	sender_id UUID NOT NULL,
	receiver_id UUID NOT NULL,
	content TEXT,
	media_url TEXT,
	is_read BOOLEAN,
	is_delivered BOOLEAN,
	timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
)

SELECT * FROM messages;

INSERT INTO messages (sender_id, receiver_id, content) VALUES (
	'cab6dab5-71fe-4c5b-a21d-4221291d8f63',
	'cab6dab5-71fe-4c5b-a21d-4221291d8f63',
	'HELLO THIS IS THE FIRST MESSAGE FOR THIS APPLICATION'
);