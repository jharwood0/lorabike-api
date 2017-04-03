# LoRaBike-api
LoRaWAN based cycle tracking
## Installation
``npm install``

## Configuration
this project requires a config folder holding the following folders with this config json:

/config/default.json

/config/test.json

/config/dev.json

```
{
  "jwtSecret": "",
  "DBHost" : "",
  "ttnRegion": "",
  "ttnAppId": "",
  "ttnAccessKey" : ""
}
```

## Running
``npm start``
