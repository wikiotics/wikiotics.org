#!/bin/bash

# We invoke this script, rather than Hugo directly, in Render.com's
# build process.

# Exit immediately on failure of any subcommand
set -e

# Pull request previews should not use the production environment.
# This will ensure analytics are disabled on them.
if [ "$IS_PULL_REQUEST" = "true" ] # https://render.com/docs/pull-request-previews
then
    HUGO_ENV=preview
else
    HUGO_ENV=production
fi
export HUGO_ENV

# Build the site using Hugo
hugo --gc --minify
