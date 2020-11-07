Development Flow:

1. Generate Code base
2. Create Dockerfile and .dockerignore file
3. Create Docker image using "docker build -t ..." and push to Docker hub
4. Create config file for both Deployment and Service (just create the file dont run "kubectl apply -f ..")
5. Create config file for ingress-nginx to handle rounting rules (just create the file dont run "kubectl apply -f ..")
5.1 When creating new service, add detail to "paths" in the config file of ingress to handlie rounting
6. Create config file for Skaffold to handle all those kubernetes stuff and run "skaffold dev" to run the server
6.1. When creating new service, add the detail in "artifacts" inside the config file for skaffold to set up file syncing
7. To out the development server, press "Ctrl C" or type "skaffold delete" to clean up

8. To add database to the service, the database will be similar to 1 seprate service, so we have to write a config file for its Deployment and Service similar to other service, and then run "skaffold dev" or "kubectl apply " to create a pod for the database
9. To add secret to a service, use "generate secret" of kubectl, by "kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf" => This will create a secrete inside k8s and we make a change to the service's deployment file to register the value as environment variable
10. To test in a microservice environment, we need a in-memory db package so simulate a virtual db, so we use "mongodb-memory-server"to generate a temp db for testing
