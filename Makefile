.DEFAULT_GOAL := help

# Service names
API_SERVICE := api
DB_SERVICE := postgres
DB_NAME := gundam_db
DB_USER := postgres
DB_VOLUME := gundam-api_postgres_data

# Phony targets by group
.PHONY: start stop restart status
.PHONY: logs logs-api logs-db
.PHONY: psql purge cleanup
.PHONY: check-env check-docker logs-timestamp
.PHONY: help

# Service Management
start: # Start the services
	docker compose up --build --detach

stop: # Stop the services
	docker compose down

restart: stop start # Restart the services

status: # Show services status
	docker compose ps

# Logging
logs: # Show all logs
	docker compose logs -f

logs-api: # Show API logs
	docker compose logs -f $(API_SERVICE)

logs-db: # Show database logs
	docker compose logs -f $(DB_SERVICE)

logs-timestamp: # Show logs with timestamps
	docker compose logs -f --timestamps

# Database Management
psql: # Connect to database with psql
	docker compose exec $(DB_SERVICE) psql -U $(DB_USER) -d $(DB_NAME)

purge: stop # Purge database volume
	@echo "Purging database volume..."
	@if docker volume inspect $(DB_VOLUME) >/dev/null 2>&1; then \
		docker volume rm $(DB_VOLUME) && echo "Volume purged successfully"; \
	else \
		echo "Volume does not exist"; \
	fi

cleanup: # Cleanup soft-deleted records
	docker compose exec $(DB_SERVICE) psql -U $(DB_USER) -d $(DB_NAME) -f /docker-entrypoint-initdb.d/cleanup.sql

# System Checks
check-env: # Show environment variables
	@echo "Environment Variables:"
	@echo "API_SERVICE: $(API_SERVICE)"
	@echo "DB_SERVICE: $(DB_SERVICE)"
	@echo "DB_NAME: $(DB_NAME)"
	@echo "DB_USER: $(DB_USER)"
	@echo "DB_VOLUME: $(DB_VOLUME)"

check-docker: # Check Docker status
	@echo "Checking Docker status..."
	@if docker info >/dev/null 2>&1; then \
		echo "Docker is running"; \
	else \
		echo "Docker is not running"; \
		exit 1; \
	fi

# Help
help: # Show help information
	@echo "Usage: make \033[36m[target]\033[0m"
	@echo ""
	@echo "Available commands:"
	@awk 'BEGIN {FS = ":.*?# "} /^[a-zA-Z_-]+:.*?# / {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
