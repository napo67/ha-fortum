# Implementation Plan: Rebase Local & Remote Branches onto Main

## 1. Goal Description

Rebase both the consolidated local branches (`style/use-solid-stepped-line-price-forecast`, `build/local-testing`) and the individual remote feature/fix branches onto the latest `main` (`64c3b87`), bringing the entire workspace and feature set up to date with release `v4.5.6`.

---

## 2. Proposed Branch Updates

### 2.1 Local Consolidated Branches
- **`style/use-solid-stepped-line-price-forecast`**: Rebase 11 commits onto `main` (`64c3b87`).
- **`build/local-testing`**: Align with `style/use-solid-stepped-line-price-forecast`.

### 2.2 Remote Feature Branches (Local Checkouts & Rebase)
- **`fix/prevent-editor-dropdown-focus-loss`**: Rebase 2 commits onto `main`.
- **`feat/add-ha-os-copy-script-with-safety-backups`**: Rebase 3 commits onto `main`.
- **`feat/expose-15-min-forecast-average-calculation`**: Rebase 1 commit onto `main`.
- **`feat/draw-daily-average-price-dotted-lines`**: Rebase 1 commit onto `main`.

---

## 3. Step-by-Step Execution Plan

### Step 1: Rebase Consolidated Local Branches
```bash
git checkout style/use-solid-stepped-line-price-forecast
git rebase main

git checkout build/local-testing
git reset --hard style/use-solid-stepped-line-price-forecast
```

### Step 2: (Optional) Rebase Individual Feature Branches
```bash
git checkout -B fix/prevent-editor-dropdown-focus-loss origin/fix/prevent-editor-dropdown-focus-loss
git rebase main

git checkout -B feat/add-ha-os-copy-script-with-safety-backups origin/feat/add-ha-os-copy-script-with-safety-backups
git rebase main

git checkout -B feat/expose-15-min-forecast-average-calculation origin/feat/expose-15-min-forecast-average-calculation
git rebase main

git checkout -B feat/draw-daily-average-price-dotted-lines origin/feat/draw-daily-average-price-dotted-lines
git rebase main
```

### Step 3: Switch back to `main`
```bash
git checkout main
```

---

## 4. Verification Plan

### Automated Checks
- Verify commit ancestry and clean history for all rebased branches:
  ```bash
  for b in style/use-solid-stepped-line-price-forecast build/local-testing fix/prevent-editor-dropdown-focus-loss feat/add-ha-os-copy-script-with-safety-backups feat/expose-15-min-forecast-average-calculation feat/draw-daily-average-price-dotted-lines; do
    echo "=== Branch: $b ==="
    git log --oneline -n 3 $b
  done
  ```
- Check working tree status:
  ```bash
  git status
  ```
