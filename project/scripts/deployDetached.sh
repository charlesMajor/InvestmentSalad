./scripts/stop.sh
docker-compose -f ./docker/docker-compose.yml --project-directory . build
docker-compose -f ./docker/docker-compose.yml --project-directory . up -d 
docker-compose -f docker/docker-compose.yml --project-directory . logs
