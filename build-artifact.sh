#!/bin/bash
set -e

# Build artifact script for Jenkins CI/CD
# This script creates a tarball while handling tar exit codes properly

ARTIFACT_NAME="nodejs-app.tar.gz"

echo "Creating deployment artifact: ${ARTIFACT_NAME}"

# Create tarball with exclusions
# tar exit codes:
#   0 = success
#   1 = some files changed while archiving (warning, not error)
#   2 = fatal error
tar --exclude=node_modules \
    --exclude=.git \
    --exclude='*.tar.gz' \
    --exclude='*.zip' \
    -czf "${ARTIFACT_NAME}" . || TAR_EXIT=$?

# Check tar exit code
if [ "${TAR_EXIT:-0}" -eq 0 ]; then
    echo "✓ Artifact created successfully"
    exit 0
elif [ "${TAR_EXIT}" -eq 1 ]; then
    echo "⚠ Warning: Some files changed during archiving (non-fatal)"
    echo "✓ Artifact created successfully"
    exit 0
else
    echo "✗ Error: Failed to create artifact (exit code: ${TAR_EXIT})"
    exit 2
fi
