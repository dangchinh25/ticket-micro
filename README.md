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

11. If we want to do code sharing between services, we can create and publish an npm package so that in other service we can simply install it
12. To handle event sharing, we use NATS Streaming Server (not NATS) by using the "nats-streaming" image available on Docker Hub and write a deployment file for NATS Streaming Server with that image (in the ports we have 2 ports, 1 for NATS client to interact with the event bus and the other is for NATS monitoring service to get more information about each channel, subscription etc)
    To work with NATS, we use a node module "node-nats-streaming" 
    Events will be defined as topic, each topic will have a different channel, and each service can subscribe to receive data from a topic or emit data to a topic/channel(pub-sub architechture ?)
    NATS streaming stores all events in memory by default(we can configure to save in flat files or in DB), this is critical important in case a service goes down and go back online again, it can access all the data that it needs and begin to process again
    If we want to scale a service horizontally, we can use a "Queue Group",of which other service can subcribe to and the Queue Group will randomly/alternate between multiple instance of the services to send data to (in other word, this is to handle the case when multiple instance of 1 service get the same piece of data and process it altogether)
    - When subscribe to a QueueGroup, we can enable .setDeliverAllAvailable().setDurableName('') in the option so the client can resume to a specific subcription with the specific name (Lecture 285-286)
    We need to config the default behaviour of NATS, which will automaticlly set the event is processed once the event is received
	while there are case when event is received but sth happen and the process is stopped midway, but NATS already think that the event is good to go
	so it wont do anything => Data/Event lost
	setManualAckMode will make the process wait for 30s to see if the process is "acknowledge" (which we will have to set manually), if nothing happen then it will think the process is broken and will try to send the event to other instance
13. A huge problem in microservice is commnicating between services, which can cause "concurency" issue (this issue exists even in monolith application but it is less prominent/ visible), a solution to this issue is to add a "version" key into each record in the database, when trying to process new data/record, it has to check if the "version" is appropriate, in this way, we can force the service to process all the data in the correct order

Client/NextJs Notes:
1. From the browser/component, if we send any request we don't have to worry anything about the domain as it uses the default current domain which (in this app, which will be "https://ticketing.dev")
2. From the Server Side Rendering (SSR) phse, (or inside getInitialProps of NextJs), if we send any request, we have to set up a domain to be able to send request
as routing is handle by ingress-nginx and the current domain is not registered
