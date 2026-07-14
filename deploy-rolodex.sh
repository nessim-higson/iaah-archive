#!/usr/bin/env bash
# Deploy the public archive PLUS the PRIVATE, password-gated /rolodex/ to
# Cloudflare Pages. The page (rolodex/) and its gate (functions/rolodex/) hold
# personal data + the shared password; both are git-ignored and injected into
# the deploy staging ONLY -- never committed to the public repo.
# Auth: run `npx wrangler login` once. Use node/npx, NOT bun.
set -euo pipefail
cd "$(dirname "$0")"
ENV_FILE="$HOME/.config/cloudflare/iaah-archive.env"; [ -f "$ENV_FILE" ] && source "$ENV_FILE"
rm -rf _deploy && mkdir _deploy
git archive HEAD | tar -x -C _deploy
rm -rf _deploy/deploy.sh _deploy/deploy-rolodex.sh _deploy/.gitignore _deploy/package.json _deploy/package-lock.json
mkdir -p _deploy/rolodex && cp rolodex/index.html _deploy/rolodex/index.html
mkdir -p _deploy/functions/rolodex && cp functions/rolodex/_middleware.js _deploy/functions/rolodex/_middleware.js
echo "Staged /rolodex/ ($(wc -c < rolodex/index.html) bytes) + password gate (git-ignored, not committed)."
npx -y wrangler pages deploy _deploy --project-name iaah-archive --branch main --commit-dirty=true
