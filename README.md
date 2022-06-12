# PWPR STAT GRAPH

## What is this?

My personal project to collect game data from video stream and plot them in a graph.

- Game: [e-baseball Pawafuru PuroYakyuu (eBASEBALL パワフルプロ野球 2022)](https://www.konami.com/pawa/2022/)
  - a Japanese Baseball game
  - tailored for a specific game mode: Eikan-Nine(栄冠ナイン)
    - currently only supports Pitchers
      - only supports `pitching speed`, `stamina`, `control`
    - plots the increase/decrease in status of pitchers in course of the game
    - Currently can only properly read English names
    - Currently can only read first 5 pitchers
    - gameplay image(it's an all Japanese game)
      ![gameplay-screenshot](/.github/readme/images/gameplay.jpg)

### Screenshot

Graph that displays the development of certain statuses within the course of the game.

![app-screenshot](/.github/readme/images/screenshot.png)

### The Entire Setup

The diagram below illustrates the entire setup needed to accumulate and plot the data.

![entire-setup](/.github/readme/images/setup.jpg)

## Developers

### Prerequisites

This is the environment I used.  
You can use different hardwares/softwares but I can not guarantee that it will work. This simply describes my environment that I got to work.

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
