# Ping Server App Helm Chart

This Helm chart deploys the Ping Server Application (backend, frontend, Postgres DB, and Keycloak) using the [bjw-s common library](https://github.com/bjw-s-labs/helm-charts/tree/main/charts/library/common) for best practices and maintainability.

## Structure
- `Chart.yaml`: Chart metadata and dependencies
- `values.yaml`: Main configuration (controllers, services, ingress, persistence, configMaps)
- `templates/`: (Optional) Custom templates if needed
- `files/`: Contains `init-databases.sh` and `ping-realm.json` for DB and Keycloak initialization

## Usage
### 1. Prerequisites
- [Helm](https://helm.sh/) installed
- [Minikube](https://minikube.sigs.k8s.io/) running
- Docker images for backend and frontend pushed to a registry accessible by Minikube

### 2. Update values.yaml
- Set your image repositories and tags as needed
- Ensure service names in ingress match the actual service names (e.g., `ping-server-app-frontend`)

### 3. Always update chart dependencies
Before every install or upgrade, run:
```sh
helm dependency update helm/ping-server-app
```
This ensures you always have the latest chart dependencies.

### 4. Deploy the chart
```sh
helm upgrade --install ping-server-app bjw-s/app-template -f values.yaml
```

### 5. Enable and configure ingress in Minikube
```sh
minikube addons enable ingress
minikube tunnel
```

### 6. Update /etc/hosts
Add the following line (replace with your Minikube IP):
```
<minikube-ip> ping-app.local
```
Get your Minikube IP with:
```sh
minikube ip
```

### 7. Access the app
- Visit http://ping-app.local in your browser
- Frontend: `/`
- Keycloak: `/auth`

## Debugging
- **Check pod status:**
  ```sh
  kubectl get pods
  ```
- **Check service names and ports:**
  ```sh
  kubectl get svc
  ```
- **Check ingress resource:**
  ```sh
  kubectl get ingress
  kubectl describe ingress ping-server-app
  ```
- **Check ingress controller logs:**
  ```sh
  kubectl logs -n ingress-nginx deployment/ingress-nginx-controller --tail=20
  ```
- **Test NodePort (if needed):**
  ```sh
  kubectl patch svc ping-server-app-frontend -p '{"spec":{"type":"NodePort"}}'
  kubectl get svc ping-server-app-frontend
  curl http://<minikube-ip>:<nodeport>
  ```
- **Port-forward for direct access:**
  ```sh
  kubectl port-forward svc/ping-server-app-frontend 8080:80
  # Then visit http://localhost:8080
  ```
- **Restart Minikube if API is slow or unresponsive:**
  ```sh
  minikube stop
  minikube start
  ```

## References
- [bjw-s common values.yaml](https://github.com/bjw-s-labs/helm-charts/blob/main/charts/library/common/values.yaml)
- [iinsys/devops example](https://github.com/iinsys/devops/blob/master/learning/helm/bjws-app/Chart.yaml)
- [adorsys/keycloak-ssi-deployment](https://github.com/adorsys/keycloak-ssi-deployment/tree/main/keycloak-chart) 