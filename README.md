## Neru App for Meetings API setup

A Simple Demo of using the Vonage Meetings API([overview](https://developer.vonage.com/meetings/overview), [API Reference](https://developer.vonage.com/meetings/api-reference)). 

You can deploy it in [NeRu](https://vonage-neru.herokuapp.com/neru/overview) or other cloud providers.

It shows you can do the following through a simple API call:
- Create/Delete/Fetch-info-of a Meetings Room
- List all Available Meetings Rooms( Active Room )
- Send invitations via SMS API
- Handle Callbacks sent from Vonage API (when deployed in NeRu) 

[Here](https://api-us.vonage.com/v1/neru/i/neru-b617e2b2-neru-test-app-dev/public/create) is a demo that is hosted in NeRu.

![create a meeting room](screenshots/Screenshot-create-a-meeting-room.png?raw=true "create a meeting room")

### Installation
This app require, node.js and react.
#### Install dependencies
- Backend, when deployed in NeRu, 
   - follow through all steps in [this NeRU toturial](https://vonage-neru.herokuapp.com/neru/tutorials/neru-get-started), and install all mentioned prerequisites
- Backend, when not deployed in NeRu, 
    - run `cd ./backend && npm install`
- Frontend, run `cd ./frontend && npm install`

#### Configuration
 - rename `./backend/neru.yml.sample` as `./backend/neru.yml`
 - rename `./frontend/.env.sample` as `./frontend/.env`
 - adjust their conent accordingly, and remove all those comments;

#### Start the server
When in localhost
```sh
cd ./backend && npm start 
cd ./frontend && npm start
```
For production environments...
- NeRu
```sh
cd ./frontend && npm run build
cp -f ./frontend/build/* ./backend/public
neru deploy
```
- For others:
```sh
cd ./frontend && npm run build
cp -f ./frontend/build/* ./backend/public
```

### Development or Debug without NeRu
You need to replace the `scripts` block in `package.json` with the the following:
```
"scripts": {
        "start": "nodemon ./bin/www.js"
      }
```
