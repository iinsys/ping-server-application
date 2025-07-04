# Ping App Helm Chart Deployment Guide

## Prerequisites
- Docker
- Docker Hub account (username: bansikah)
- Minikube (or any Kubernetes cluster)
- Helm

## 1. Build, Tag, and Push Images to Docker Hub

Use the Makefile at the project root:

```sh
make all
```
This will:
- Build backend and frontend images
- Tag them as bansikah/ping-service:latest and bansikah/ping-web:latest
- Push both images to Docker Hub

## 2. Update Helm Chart to Use Docker Hub Images

```sh
make update-helm-values
```
This will update `ping-app/values.yaml` to use the pushed images.

## 3. Install or Upgrade the Helm Chart

```sh
helm upgrade --install ping-app ./ping-app --namespace default --create-namespace
```

## 4. Add Ingress Host to /etc/hosts

```sh
echo "$(minikube ip) ping-app.local" | sudo tee -a /etc/hosts
```

## 5. Check Status

```sh
kubectl get pods -n default
kubectl get svc -n default
kubectl get ingress -n default
```

## 6. Access the App
- Frontend: http://ping-app.local/
- Keycloak: http://ping-app.local/auth

---

**Troubleshooting:**
- If pods are stuck in `ImagePullBackOff`, ensure images are pushed to Docker Hub and `values.yaml` is correct.
- If using Minikube and want to use local images, use `minikube image load ...` and set image names accordingly. 