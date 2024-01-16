#!/bin/bash

 . /app/app_py_env/bin/activate

 RESULT_VERSION="$(exec python3 /app/$USING_FILE @)"

 echo "RESULT_VERSION=$RESULT_VERSION" >> $GITHUB_OUTPUT