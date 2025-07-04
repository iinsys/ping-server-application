DOCKER_USER = bansikah
BACKEND_IMAGE = $(DOCKER_USER)/ping-service:latest
FRONTEND_IMAGE = $(DOCKER_USER)/ping-web:latest

.PHONY: all build-backend build-frontend tag-backend tag-frontend push-backend push-frontend push-all

all: build-backend build-frontend tag-backend tag-frontend push-backend push-frontend

build-backend:
	docker build -t ping-backend:latest ./backend

build-frontend:
	docker build -t ping-frontend:latest ./frontend

tag-backend:
	docker tag ping-backend:latest $(BACKEND_IMAGE)

tag-frontend:
	docker tag ping-frontend:latest $(FRONTEND_IMAGE)

push-backend:
	docker push $(BACKEND_IMAGE)

push-frontend:
	docker push $(FRONTEND_IMAGE)

push-all: push-backend push-frontend

update-helm-values:
	sed -i '' 's|image:.*ping-backend:latest|image: $(BACKEND_IMAGE)|' ping-app/values.yaml
	sed -i '' 's|image:.*ping-frontend:latest|image: $(FRONTEND_IMAGE)|' ping-app/values.yaml

# Usage:
# make all         # Build, tag, and push both images
# make push-all    # Push both images
# make update-helm-values # Update values.yaml to use Docker Hub images 