# Neru App for Meetings API setup

A Simple Demo of using the Vonage Meetings API
- [Vonage Meetings API Overview](https://developer.vonage.com/meetings/overview).
- [Vonage Meetings API API Reference](https://developer.vonage.com/meetings/api-reference). 

You can deploy it in [NeRu](https://vonage-neru.herokuapp.com/neru/overview)

Features:
- Create/Delete/Fetch-info-of a Meetings Room
- List all Available Meetings Rooms( Active Room )
- Send invitations via SMS API
- Handle Callbacks sent from Vonage API (when deployed in NeRu) 

[Here](https://api-us.vonage.com/v1/neru/i/neru-b617e2b2-neru-test-app-dev/public/create) is a demo that is hosted in NeRu.
![create a meeting room](screenshots/Screenshot-create-a-meeting-room.png?raw=true "create a meeting room")


## Installation
First clone this git repo 
```
git clone git@github.com:nexmo-se/neru-meetings-api.git
```

#### Frontend pages 
Configure .env, install dependencies
```
cd frontend && cp sample.env .env

# update .env

npm install
```

#### Deploly to NeRu
[Read more about NeRU](https://vonage-neru.herokuapp.com/neru/tutorials/neru-get-started)
- Configure NeRu
```
cd neru && neru configure
```
- Install dependencies, build frontend files, and deploy to NeRu
```
npm install
npm run build

# neru
neru deploy
```
