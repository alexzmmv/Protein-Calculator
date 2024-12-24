#!/bin/bash

if [ -z "$1" ]; then
    echo "Error: No commit message provided."
    echo "Usage: $0 <commit-message>"
    exit 1
fi

sudo git add .
sudo git commit -m "$1"
sudo git push --force