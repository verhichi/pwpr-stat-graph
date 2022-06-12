import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Highcharts from 'highcharts'
import { useEffect, useState } from 'react'

import { LineChart } from '@/components/LineChart'
import { useInit } from '@/hooks'

export const App = () => {
  const { names, dates, series, loading } = useInit()
  const [name, setName] = useState('')

  useEffect(() => {
    if (!names.length) return
    setName(names[0])
  }, [names])

  const options: Highcharts.Options = {
    chart: {
      zoomType: 'xy',
      alignTicks: false,
    },
    title: {
      text: 'パワプロ2022 投手成長グラフ',
    },
    subtitle: {
      text: '栄冠ナイン 3年縛り',
    },
    xAxis: [
      {
        categories: dates,
        crosshair: true,
      },
    ],
    yAxis: [
      {
        // Primary yAxis
        title: {
          text: '球速',
        },
        labels: {
          format: '{value} km/s',
        },
        min: 80,
        max: 180,
        tickInterval: 20,
      },
      {
        // Secondary yAxis
        title: {
          text: 'コントロール / スタミナ',
        },
        opposite: true,
        min: 0,
        max: 100,
        tickInterval: 20,
      },
    ],
    tooltip: {
      shared: true,
    },
    series: series ? series[name] : [],
  }

  const handleChangeName = (event: SelectChangeEvent) => {
    setName(event.target.value as string)
  }

  return (
    <div>
      {!loading && (
        <>
          <FormControl fullWidth>
            <InputLabel id="player-name-label">Name</InputLabel>
            <Select
              id="player-name"
              labelId="player-name-label"
              value={name}
              onChange={handleChangeName}
              label="Name"
              displayEmpty
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <LineChart options={options} />
        </>
      )}
    </div>
  )
}
