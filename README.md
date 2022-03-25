# Neru App for Meetings API setup

A Simple Demo of using the Vonage Meetings API with its code deplyoed in NeRu.

# Install
## Backend 
Follow toturial [https://vonage-neru.herokuapp.com/neru/tutorials/neru-get-started]

## Frontend 
```
# with react, npx create-react-app frontend
cd ./frontend
npm install
```

# Deploy
( - "neru-alpha" doesn't have a Provider for Meetings API yet. so I created a lib/meetings.js for calling Meetings API -)

# Run in local + Dev
## Backend + Frontend 
```
npm start
```

## Debugging with NeRu
```
neru debug
```

# Deploy to NeRu
```
cd ./frontend
npm run build
// move ./frontend/build to ./public

// then
neru deploy
```

# Run
## Frontend page - create a room
[https://api-us.vonage.com/v1/neru/i/neru-b617e2b2-neru-test-app-dev/public/create]

## callback URL registered for Meetings API :
[https://api-us.vonage.com/v1/neru/i/neru-b617e2b2-neru-test-app-dev/onMeetings]
