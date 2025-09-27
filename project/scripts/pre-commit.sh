#!/bin/bash

echo "Running maven JUnit tests"

./scripts/deployDetached.sh
if [ $? -ne 0 ]
then
        echo "Deployment tests must pass before commit!!!"
        exit 1
fi

cd ./containers/backend_api/investmentSaladApi/
./mvnw clean test

if [ $? -ne 0 ]
then
        echo "Unit tests must pass before commit!!!"
        exit 1
fi

