# Meli Backend

A Go backend service built with Gin framework providing RESTful API endpoints.

## Features

- RESTful API with Gin framework
- Health check endpoint
- GET endpoints for items
- CORS middleware
- Environment variable configuration
- Structured logging
- Error handling

## Prerequisites

- Go 1.21 or higher
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd meli-prototype/backend
```

2. Install dependencies:
```bash
go mod tidy
```

3. Copy environment file:
```bash
cp env.example .env
```

4. Edit `.env` file with your configuration values.

## Quick Start

For a complete setup with database and migrations:

```bash
# Install dbmate and setup migrations
make migrations

# Start database and apply migrations
make db-setup

# Run the application
make run
```

**Or use the all-in-one command:**
```bash
make dev-setup
```

This will:
- Install dbmate for database migrations
- Start PostgreSQL database
- Apply all pending migrations
- Start the Go server

**All in one command!** 🚀

## Running the Application

### Development Mode
```bash
go run main.go
```

### Production Mode
```bash
go build -o meli-backend main.go
./meli-backend
```

### Using Air for Live Reload (Optional)
```bash
# Install Air
go install github.com/cosmtrek/air@latest

# Run with Air
air
```

## API Endpoints

### Health Check
- **GET** `/health` - Server health status

### Items
- **GET** `/api/v1/items` - Get all items
- **GET** `/api/v1/items/:id` - Get item by ID

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `8080` |
| `GIN_MODE` | Gin mode (debug/release) | `debug` |

## Project Structure

```
backend/
├── main.go              # Main application file
├── go.mod              # Go module file
├── go.sum              # Go dependencies checksums
├── .env                # Environment variables (create from env.example)
├── env.example         # Environment variables template
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Development

### Development Workflow

```bash
# 1. Setup complete development environment
make dev-setup

# 2. Create new migration when needed
make migration-create

# 3. Apply migrations
make migration-up

# 4. Reset database if needed
make db-reset
```

### Adding New Dependencies
```bash
go get github.com/package-name
go mod tidy
```

### Running Tests
```bash
go test ./...
```

### Code Formatting
```bash
go fmt ./...
```

### Code Linting
```bash
go vet ./...
```

## Database Migrations

This project uses [dbmate](https://github.com/amacneil/dbmate) for database migrations.

### Setup Migrations
```bash
make migrations
```

This command will:
- Download and install dbmate if not already installed
- Create the migrations directory
- Set up the migration environment

### Create a New Migration
```bash
make migration-create
```

This will prompt you for a migration name and create both `.up.sql` and `.down.sql` files.

### Apply Migrations
```bash
# Start the database first
make db-start

# Apply all pending migrations
make migration-up
```

### Rollback Migrations
```bash
make migration-down
```

### Load Seeds
```bash
# Load seeds into database
make seeds-load
```

### Database Management
```bash
# Start database
make db-start

# Stop database
make db-stop

# Start database and apply migrations (recommended for development)
make db-setup

# Reset database completely (fresh start with migrations)
make db-reset

# Reset database and load seeds
make db-reset-with-seeds
```

### Migration Files

Migration files are stored in the `migrations/` directory and follow the naming convention:
- `001_description.up.sql` - Migration to apply
- `001_description.down.sql` - Migration to rollback

Example migration structure:
```sql
-- 001_create_items_table.up.sql
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

-- 001_create_items_table.down.sql
DROP TABLE items;
```

## Docker Support (Future)

The project is prepared for Docker containerization. You can add a Dockerfile when needed.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is part of the Meli prototype.
