#!/bin/bash
GIT_COMMIT=`git log --format="%H" -n 1`
GIT_BRANCH=`git rev-parse --abbrev-ref HEAD`

echo "Deploying to Heroku..."
echo "Branch: $GIT_BRANCH"
echo "Commit: $GIT_COMMIT"

FILE=./deploy.tgz
if [ -f "$FILE" ]; then
  rm deploy.tgz
fi

cd client/react
npm run build

if [ $? -eq 0 ]
then
  echo "Build front successfully."
else
  echo "Build front failed." >&2
  exit 1
fi

cd ../..
tar -cf deploy.tgz --exclude=__tests__ --exclude=client --exclude=node_modules *
HEROKU_VERSION=$GIT_COMMIT
HEROKU_APP_NAME=salaseducacionais

# Set in environment variables
# HEROKU_API_KEY=your_api_key

URL_BLOB=`curl -s -n -X POST https://api.heroku.com/apps/$HEROKU_APP_NAME/sources \
-H 'Accept: application/vnd.heroku+json; version=3' \
-H "Authorization: Bearer $HEROKU_API_KEY"`

PUT_URL=`echo $URL_BLOB | python -c 'import sys, json; print(json.load(sys.stdin)["source_blob"]["put_url"])'`
GET_URL=`echo $URL_BLOB | python -c 'import sys, json; print(json.load(sys.stdin)["source_blob"]["get_url"])'`

curl $PUT_URL  -X PUT -H 'Content-Type:' --data-binary @deploy.tgz

REQ_DATA="{\"source_blob\": {\"url\":\"$GET_URL\", \"version\": \"$HEROKU_VERSION\"}}"

BUILD_OUTPUT=`curl -s -n -X POST https://api.heroku.com/apps/$HEROKU_APP_NAME/builds \
-d "$REQ_DATA" \
 -H 'Accept: application/vnd.heroku+json; version=3' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $HEROKU_API_KEY"`

STREAM_URL=`echo $BUILD_OUTPUT | python -c 'import sys, json; print(json.load(sys.stdin)["output_stream_url"])'`

curl $STREAM_URL