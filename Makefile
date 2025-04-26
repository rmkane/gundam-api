.PHONY: up down restart status logs psql purge

# Start the database
up:
	docker-compose up -d

# Stop the database
down:
	docker-compose down

# Restart the database
restart: down up

# Show database status
status:
	docker-compose ps

# Show database logs
logs:
	docker-compose logs -f postgres

# Connect to database with psql
psql:
	docker-compose exec postgres psql -U postgres -d gundam_db

# Purge database volume
purge: down
	docker volume rm gundam-api_postgres_data 
