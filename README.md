Development Flow:

1. Generate Code base
2. Create Dockerfile and .dockerignore file
3. Create Docker image using "docker build -t ..."
4. Create config file for both Deployment and Service (just create the file dont run "kubectl apply -f ..")
5. Create config file for ingress-nginx to handle rounting rules (just create the file dont run "kubectl apply -f ..")
6. Create config file for Skaffold to handle all those kubernetes stuff and run "skaffold dev" to run the server
7. To out the development server, press "Ctrl C" or type "skaffold delete" to clean up
