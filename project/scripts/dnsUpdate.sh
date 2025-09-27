#!/bin/bash

# Dynu DDNS Update Script

# Dynu credentials
USERNAME="Alex2136005 "
PASSWORD="PxVHJ8u;~_@D2="
HOSTNAME="investmentsalad.ddnsfree.com"

# External IP retrieval
EXTERNAL_IP=$(curl -s https://api.ipify.org)

# Update Dynu with the new IP
RESULT=$(curl -s "https://api.dynu.com/nic/update?hostname=$HOSTNAME&myip=$EXTERNAL_IP" \
    -u "$USERNAME:$PASSWORD")
