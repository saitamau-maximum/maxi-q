CREATE TABLE questions (
    post_id TEXT PRIMARY KEY NOT NULL,
    content TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    solved INTEGER NOT NULL DEFAULT 0
);