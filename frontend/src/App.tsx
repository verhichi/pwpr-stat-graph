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

  const handleChangeName = (e) => setName(e.target.value)

  return (
    <div>
      {!loading && (
        <>
          <select value={name} onChange={handleChangeName}>
            <option>---</option>
            {names.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <LineChart options={options} />
        </>
      )}
    </div>
  )
}
