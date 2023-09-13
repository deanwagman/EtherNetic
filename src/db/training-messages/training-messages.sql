-- Create the guides table
CREATE TABLE guides (
    guide_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create the topics table
CREATE TABLE topics (
    topic_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create the training_messages table
CREATE TABLE training_messages (
    id SERIAL PRIMARY KEY,
    guide_id INTEGER REFERENCES guides(guide_id),
    topic_id INTEGER REFERENCES topics(topic_id),
    message_type VARCHAR(50) NOT NULL,
    actor VARCHAR(100),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster lookups
CREATE INDEX idx_guide ON training_messages(guide_id);
CREATE INDEX idx_topic ON training_messages(topic_id);

-- Create a full-text search index on the content column
CREATE INDEX idx_content_fts ON training_messages USING gin(to_tsvector('english', content));
