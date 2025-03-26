#!/bin/bash

# Test script for the npm package
# This script creates a tarball of the package, installs it globally,
# tests it, and then uninstalls it.

echo "Creating tarball of the package..."
npm pack

# Get the package name and version from package.json
PACKAGE_NAME=$(node -e "console.log(require('./package.json').name.replace('@', '').replace('/', '-'))")
PACKAGE_VERSION=$(node -e "console.log(require('./package.json').version)")
TARBALL="${PACKAGE_NAME}-${PACKAGE_VERSION}.tgz"

echo "Installing package globally from tarball..."
npm install -g "./${TARBALL}"

echo "Testing the package..."
echo "Version flag test:"
timezone-toolkit --version

echo "Running test-server.js..."
node test-server.js --test-version

echo "Uninstalling the package..."
npm uninstall -g "@cicatriz/timezone-toolkit"

echo "Cleaning up..."
rm "./${TARBALL}"

echo "Test completed!"
