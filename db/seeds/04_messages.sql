-- Users table seeds here (Example)
INSERT INTO messages(from_user_id, to_user_id, listing_id, message, sent_at) VALUES
(5, 1, 1, 'Gimmy this for 2$', NOW()),
(5, 1, 2, 'Gimmy this for 2$', NOW()),
(1, 5, 1, 'NO', NOW()),
(1, 5, 2, 'I call the police', NOW()),
(5, 1, 2, 'I love that band', NOW()),
(1, 5, 1, 'I hope that someone gets my, message in a bottle', NOW());
