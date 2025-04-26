.PHONY: start stop restart status logs logs-api logs-db psql purge cleanup

# Start the services
start:
	docker-compose up --build --detach

# Stop the services
stop:
	docker-compose down

# Restart the services
restart: stop start

# Show services status
status:
	docker-compose ps

# Show all logs
logs:
	docker-compose logs -f

# Show API logs
logs-api:
	docker-compose logs -f api

# Show database logs
logs-db:
	docker-compose logs -f postgres

# Connect to database with psql
psql:
	docker-compose exec postgres psql -U postgres -d gundam_db

# Purge database volume
purge: stop
	docker volume rm gundam-api_postgres_data

# Cleanup soft-deleted records
cleanup:
	docker-compose exec postgres psql -U postgres -d gundam_db -f /docker-entrypoint-initdb.d/cleanup.sql 
