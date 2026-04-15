---
name: Git preflight
description: Always rebase, pull, and stash before editing any file
type: rule
---

Before editing any file:

1. Check the current branch: `git branch --show-current`
2. Rebase with main:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
3. Pull the latest remote changes:
   ```bash
   git pull
   ```
   If there are uncommitted local changes, stash first (`git stash`), pull, then reapply (`git stash pop`).
