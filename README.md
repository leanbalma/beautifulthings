# beautifulthings-server-config
Config and service files for the google cloud server

## Steps to deploy bt server in google cloud.
First create a new project in gc, using the visual interface, and configure the billing method.
Then Using Google Cloud Shell (top left icon >_):

### Set project id and zone:
```bash
gcloud config set project <actual project ID>
gcloud config set compute/zone us-east1-b
gcloud auth configure-docker
export PROJECT_ID="$(gcloud config get-value project -q)"
```
### (optional) Clone the repo, set the ID and bluild the docker image
```bash
git clone https://github.com/chiiph/beautifulthings.server.git
cd beautifulthings.server/
docker build -t gcr.io/${PROJECT_ID}/beautifulthings:latest .
```
### (optional) Check if image was build, configure and push it:
```bash
docker push gcr.io/${PROJECT_ID}/beautifulthings:latest
```
### (optional) Test docker image (the curl shoud return a 405/500 error):
```bash
docker run --rm -p 8080:8080 gcr.io/${PROJECT_ID}/beautifulthings:v1
curl http://localhost:8080/things/2018-01-01/2019-01-01?token=sdkfjbfdshjbdsfhjsbdfkjhdsfbsdfjkhbsdfhbdf
```
## Create cluster with visual interface, some notes:
- Zonal for the Location type, us-east1-b.
- Create a 3-node pool using the cheapest instance type (micro).
- For that node pool, in the advanced screen, 
- - set the boot disk size to 10GB.
- - enable preemptible nodes. (check this one).
- - enable auto-upgrade and auto-repair.
- Below the node pool there are some additional options. 
- - Disable HTTP load balancing.
- - Disable all the StackDriver.
- - Disable the kubernetes dashboard.

### Goto menu > IAM > Service accounts, enter de account and create a new key (it will generate a json file spartan-calling-218821-3348c633f71c in this case)
Then, go to the console and run:
```bash
gcloud container clusters get-credentials beautifulthings-cluster
gcloud auth activate-service-account --key-file spartan-calling-218821-3348c633f71c.json
kubectl create secret generic gcs --from-file spartan-calling-218821-3348c633f71c.json
```
## Cloudflare image commands:
```bash
git clone https://github.com/calebdoxsey/kubernetes-cloudflare-sync.git
cd kubernetes-cloudflare-sync/
docker build -t gcr.io/${PROJECT_ID}/kubernetes-cloudflare-sync:latest .
docker push gcr.io/${PROJECT_ID}/kubernetes-cloudflare-sync:latest
kubectl create secret generic cloudflare --from-literal=email='<cloudflare user email>' --from-literal=api-key='<cloudflare generated key>'
kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin --user <admin email>
kubectl create clusterrolebinding --clusterrole=cluster-admin --serviceaccount=default:default concourse-admin
```
### Cert manager install (before, check that helm is instaled)
```bash
kubectl create clusterrolebinding tiller-admin-binding --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
kubectl create serviceaccount --namespace kube-system tiller
kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'
./helm init --service-account tiller --upgrade
./helm/helm install --name m-cert-manager -f ./letsencrypt.yaml stable/cert-manager
```
### Run the deploy:
```bash
kubectl apply -f .
```

### Connom commands:
```bash
gcloud compute instances list
kubectl get pods
kubectl get service
kubectl get deployments
kubectl get secrets
kubectl delete -f .
kubectl get node -o yaml
kubectl cluster-info
kubectl logs --v=3 -f <pod>
kubectl logs -f <pod>
kubectl proxy
```

### Install helm:
```bash
wget https://storage.googleapis.com/kubernetes-helm/helm-v2.6.2-linux-amd64.tar.gz
tar zxfv helm-v2.6.2-linux-amd64.tar.gz
cp linux-amd64/helm .
kubectl create clusterrolebinding user-admin-binding --clusterrole=cluster-admin --user=$(gcloud config get-value account)
kubectl create serviceaccount tiller --namespace default
kubectl create clusterrolebinding tiller-admin-binding --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
kubectl create clusterrolebinding --clusterrole=cluster-admin --serviceaccount=default:default concourse-admin
./helm init --service-account=tiller
./helm update
Complement for helm instalation:
export PROJECT=$(gcloud info --format='value(config.project)')
export BUCKET=$PROJECT-helm-repo
./helm plugin install https://github.com/viglesiasce/helm-gcs.git --version v0.1.1
gsutil mb -l us-central1 gs://$BUCKET
./helm gcs init gs://$BUCKET
./helm version
```
