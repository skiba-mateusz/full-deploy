#!/bin/bash

BACKUP_DIR="/home/deploy/backups"
TIMESTAMP=$(date +"%Y-%m-%d_%H:%M:%S")
BACKUP_NAME="db_backup_$TIMESTAMP.sql.gz"

mkdir -p "$BACKUP_DIR"

docker exec db pg_dump -U postgres -d example | gzip > "$BACKUP_DIR/$BACKUP_NAME"

if [ $? -eq 0 ]; then
    echo "Bakup successful: $BACKUP_DIR/$BACKUP_NAME" 
else
    echo "Backup failed"
    exit 1
fi

find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +10 -delete

echo "backups cleaned"
