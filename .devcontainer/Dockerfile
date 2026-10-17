# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/devcontainers/python:3.14-bookworm

# 1. Install Bubblewrap for unprivileged kernel namespace sandboxing and core utilities
RUN apt-get update && apt-get install -y --no-install-recommends \
    bubblewrap \
    build-essential \
    ca-certificates \
    curl \
    git \
    libffi-dev \
    libssl-dev \
    procps \
    && rm -rf /var/lib/apt/lists/*

# 2. Install Astral uv (ultra-fast Python package and project manager)
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# 3. Establish FHS-compliant application directories with vscode ownership
RUN mkdir -p /var/log/app /var/lib/app \
    && chown -R vscode:vscode /var/log/app /var/lib/app

# 4. Switch to non-root developer user and install Google Antigravity CLI (agy)
USER vscode
ENV PATH="/home/vscode/.local/bin:${PATH}"
RUN curl -fsSL https://antigravity.google/cli/install.sh | bash

# 5. Configure environment variables for uv and Python toolchain
ENV UV_LINK_MODE=copy \
    UV_CACHE_DIR=/home/vscode/.cache/uv \
    PYTHONUNBUFFERED=1
