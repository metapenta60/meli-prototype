.PHONY: help build run test clean deps fmt lint docker-build docker-run migrations migration-create migration-up migration-down

seeds-load:
	@echo "Loading seeds into database..."
	@if [ -d "./internal/db/seeds" ]; then \
		for seed in ./internal/db/seeds/*.sql; do \
			if [ -f "$$seed" ]; then \
				echo "Loading seed: $$seed"; \
				export DATABASE_URL="postgres://postgres:password@localhost:5432/meli_db?sslmode=disable" && psql "postgres://postgres:password@localhost:5432/meli_db?sslmode=disable" -f "$$seed"; \
			fi; \
		done; \
		echo "Seeds loaded successfully!"; \
	else \
		echo "Seeds directory not found: ./internal/db/seeds"; \
		exit 1; \
	fi

run:
	docker-compose up --build -d
	@make seeds-load

