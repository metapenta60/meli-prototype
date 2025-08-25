#!/bin/sh

# Wait for database to be ready
echo "Waiting for database to be ready..."
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 1
done
echo "Database is ready!"

# Run migrations
echo "Running database migrations..."
dbmate up
if [ $? -ne 0 ]; then
  echo "Failed to run migrations"
  exit 1
fi
echo "Migrations completed successfully!"

# Start the application
echo "Starting application..."
exec ./meli-backend
