## Requirements
- Node 9.5.0

## Running Project on Local

### Prerequisites

- `instajobs-jobapp-backend` is setup and running on  http://localhost:7500

### Run node.js

- `cd instajobs-client-desktop` - Project folder
- `npm install`
- `gulp`
- Open at http://localhost:6001

## Deploying

### Prerequisites

- install aws cli 
- configure aws cli access_key and secret_key to point instajobs aws account
- install docker cli

### Deploy to AWS 

- `sh aws/deploy.sh staging`
- `sh aws/deploy.sh production`
