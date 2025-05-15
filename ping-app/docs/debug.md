```bash
minikube stop
minikube delete
minikube start --driver=docker
```

#### Enable Addons
```bash
minikube addons enable ingress
minikube addons enable default-storageclass
minikube addons enable storage-provisioner
minikube addons enable dashboard
```