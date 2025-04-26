#!/bin/bash

# Default environment values
DB_HOST="localhost"
DB_PORT="5432"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_NAME="gundam_db"

# Check if .env file already exists
if [ -f .env ]; then
    echo ".env file already exists. Do you want to overwrite it? (y/n)"
    read -r answer
    if [ "$answer" != "y" ]; then
        echo "Exiting without changes."
        exit 0
    fi
fi

# Create .env file with default values
cat > .env << EOL
DB_HOST=$DB_HOST
DB_PORT=$DB_PORT
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD
DB_NAME=$DB_NAME
EOL

echo ".env file has been created with default values."
echo "Please review and modify the values as needed." 
