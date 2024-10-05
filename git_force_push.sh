#!/bin/bash

# Step 1: Ensure we're in the correct directory
cd /path/to/your/project

# Step 2: Check if there are any changes to commit
if [[ -z $(git status -s) ]]; then
    echo "No changes to commit"
    exit 0
fi

# Step 3: Add all changes
git add .

# Step 4: Commit changes
read -p "Enter commit message: " commit_message
git commit -m "$commit_message"

# Step 5: Fetch the latest changes from the remote
git fetch origin

# Step 6: Rebase the current branch on top of the remote branch
git rebase origin/main

# Step 7: Force push the changes
git push origin main --force

echo "Changes have been committed and force pushed to the remote repository."