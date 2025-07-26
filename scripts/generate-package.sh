#!/bin/bash

# This script generates a package.json file for a new Node.js package.

# Get the package name and version from the user
read -p "Enter the package name: " PACKAGE_NAME
read -p "Enter the package version (1.0.0): " PACKAGE_VERSION
PACKAGE_VERSION=${PACKAGE_VERSION:-1.0.0}

mkdir -p "packages/$PACKAGE_NAME"

# Create the package.json file
cat <<EOF > "packages/$PACKAGE_NAME/package.json"
{
  "name": "@purly/$PACKAGE_NAME",
  "version": "$PACKAGE_VERSION",
  "description": "",
  "exports": {
    "./*": "./dist/*.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
EOF

cat <<EOF > "packages/$PACKAGE_NAME/tsconfig.json"
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
EOF

echo "tsconfig.json file created successfully."
