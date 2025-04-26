#!/bin/bash

# Default environment values
VITE_API_URL="http://localhost:3000/api/v1"

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
VITE_API_URL=$VITE_API_URL
EOL

echo ".env file has been created with default values."
echo "Please review and modify the values as needed." 
