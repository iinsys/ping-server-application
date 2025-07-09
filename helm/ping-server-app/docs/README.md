# Ping Server Application - Helm Deployment Guide

This guide explains how to deploy the Ping Server Application (backend, frontend, Postgres, Keycloak) on Kubernetes using Helm and the bjw-s common library.

## Prerequisites
- [Helm 3.x](https://helm.sh/docs/intro/install/)
- [Minikube](https://minikube.sigs.k8s.io/docs/) or a Kubernetes cluster
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- Docker (for building/pushing images, if needed)

## 1. Start Minikube
```sh
minikube start
minikube addons enable ingress
```

## 2. (Optional) Build and Load Images
If you want to use local images:
```sh
# From project root
minikube image load bansikah/ping-service:latest
minikube image load bansikah/ping-web:latest
```
Or push your images to a registry and update `values.yaml` accordingly.

## 3. Install Helm Dependencies
```sh
cd helm/ping-server-app
helm dependency update
helm dependency build
```

## 4. Deploy the Chart
```sh
helm install ping-server-app .
```

## 5. Update /etc/hosts
Add the following line to your `/etc/hosts` file (replace with your Minikube IP if not using localhost):
```sh
echo "$(minikube ip) ping-app.local" | sudo tee -a /etc/hosts
```

## 6. Access the Application
- **Frontend:** http://ping-app.local/
- **Keycloak:** http://ping-app.local/auth

## 7. Troubleshooting
- Check pod status:
  ```sh
  kubectl get pods
  ```
- Check service status:
  ```sh
  kubectl get svc
  ```
- Check ingress:
  ```sh
  kubectl get ingress
  ```
- View logs:
  ```sh
  kubectl logs <pod-name>
  ```

## 8. Uninstall
```sh
helm uninstall ping-server-app
```

---

For more details, see the main [README.md](../README.md) or the chart [README.md](../README.md) in this directory. 