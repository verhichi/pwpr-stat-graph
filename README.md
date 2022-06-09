# PWPR STAT GRAPH

## What is this?

My personal project to collect game data from video stream and plot them in a graph.

- Game: [e-baseball Pawafuru PuroYakyuu (eBASEBALL パワフルプロ野球 2022)](https://www.konami.com/pawa/2022/)
  - a Japanese Baseball game
  - only for specific mode: Eikan-Nine(栄冠ナイン)

TODO: Sample Image of Graph

## Developers

### Prerequisites

- Data Accumulator

  - Language:
    - Python 3.10.4
  - Software:
    - Tesseract 5.0.1
    - OBS 27.2.4 (For Rendering from Stream)
    - Must use [OBS VirtualCam v2.0.5](https://obsproject.com/forum/resources/obs-virtualcam.949/) to capture stream
  - Hardware:
    - hardware: [hdmi capture board](https://www.amazon.co.jp/gp/product/B089GZ4N48) to capture console game stream(like switch or playstation)

- API Server

  - Language:
    - Python 3.10.4

- Frontend
  - node: v16.15.0 and above

### Setup

Run the following Makefile command to install dependencies.
This will install all backend and frontend dependencies.

```bash
$ make install
```

### Accumulating Data

1. Start the Game
1. Open OBS and display game screen
   - Use OBS Virtual Camera
1. Run the following command to start collecting data from stream
   ```bash
   $ make start-accumulator
   ```
1. Play the game in Eikan-Nine(栄冠ナイン) mode
1. Once done, stop accumulator(WIP: just `ctrl + c` for now)
1. Data should be accumulated in output as `{start_timestamp}.csv`

### Start Backend API Dev Server

Run the following command to start API Server in development mode.  
Service will be available in `http://localhost:5000`.

```bash
$ make start-server
```

### Start Frontend Dev server

Run the following command to start Frontend dev server.  
Service will be available in `http://localhost:3000`.

```bash
$ make start-front
```

### Build

TODO: May not setup build process as this app is made for local use and using dev server is good enough.
