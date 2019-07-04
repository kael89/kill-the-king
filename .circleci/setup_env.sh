#!/bin/bash

# Overwrite environment variables for dev
case $CIRCLE_BRANCH in
    "dev")
        export REACT_APP_API_URL=$REACT_APP_API_URL_DEV
        ;;
esac
