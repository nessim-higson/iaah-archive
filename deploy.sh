#!/usr/bin/env bash
# Deploy the IAAH Flash archive to Cloudflare Pages (project: iaah-archive).
#
# Auth (either):
#   - wrangler OAuth session (npx wrangler login), or
#   - CLOUDFLARE_API_TOKEN [+ CLOUDFLARE_ACCOUNT_ID] in the environment,
#     optionally via ~/.config/cloudflare/iaah-archive.env
#
# NOTE: run with node/npx, NOT bun — wrangler silently no-ops under bun.
set -euo pipefail
cd "$(dirname "$0")"

ENV_FILE="$HOME/.config/cloudflare/iaah-archive.env"
[ -f "$ENV_FILE" ] && source "$ENV_FILE"

# Stage a clean copy from HEAD — never the working tree. Parallel sessions
# leave uncommitted WIP here (this bit us twice); only committed work ships.
if ! git diff-index --quiet HEAD -- || [ -n "$(git ls-files --others --exclude-standard)" ]; then
  echo "note: uncommitted/untracked changes present — deploying HEAD without them:"
  git status --short | head -20
fi
rm -rf _deploy && mkdir _deploy
git archive HEAD | tar -x -C _deploy
rm -rf _deploy/deploy.sh _deploy/.gitignore _deploy/package.json _deploy/package-lock.json

npx -y wrangler pages deploy _deploy --project-name iaah-archive --branch main --commit-dirty=true
