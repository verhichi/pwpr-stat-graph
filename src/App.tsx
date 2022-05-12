import Highcharts from 'highcharts'
import { useState } from 'react'

import { LineChart } from '@/components/LineChart'
import { rawData } from '@/data'

const PLAYER_NAMES = ['Arin', 'Brian', 'Carl', 'David', 'Edmond']

const DATES = [
  '2022/05',
  '2022/06',
  '2022/07',
  '2022/08',
  '2022/09',
  '2022/10',
  '2022/11',
  '2022/12',
  '2023/01',
  '2023/02',
  '2023/03',
  '2023/04',
  '2023/05',
  '2023/06',
  '2023/07',
  '2023/08',
  '2023/09',
  '2023/10',
  '2023/11',
  '2023/12',
  '2024/01',
  '2024/02',
  '2024/03',
  '2024/04',
  '2024/05',
  '2024/06',
  '2024/07',
]

const series = PLAYER_NAMES.reduce((obj, name, idx) => {
  const pitchingSpeed = {
    name: '球速',
    type: 'line',
    data: [] as (number | null)[],
    tooltip: {
      valueSuffix: ' km/s',
    },
    color: Highcharts.getOptions().colors[idx],
  }
  const control = {
    name: `コントロール`,
    type: 'line',
    data: [] as (number | null)[],
    dashStyle: 'ShortDot',
    yAxis: 1,
    color: Highcharts.getOptions().colors[idx],
  }
  const stamina = {
    name: `スタミナ`,
    type: 'line',
    data: [] as (number | null)[],
    dashStyle: 'LongDash',
    yAxis: 1,
    color: Highcharts.getOptions().colors[idx],
  }
  const nameDateMatch = DATES.map(
    (date) => rawData.find((data) => data.date === date && data.name === name) || null,
  )

  nameDateMatch.forEach((data) => {
    pitchingSpeed.data = [
      ...pitchingSpeed.data,
      parseInt(data?.pitching_speed || '') || null,
    ]
    control.data = [...control.data, parseInt(data?.control || '') || null]
    stamina.data = [...stamina.data, parseInt(data?.stamina || '') || null]
  })
  return { ...obj, [name]: [pitchingSpeed, control, stamina] }
}, {})

const getOptions = (value: string): Highcharts.Options => ({
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
      categories: DATES,
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
      // gridLineWidth: 0,
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
  series: series[value],
})

export const App = () => {
  const [name, setName] = useState(PLAYER_NAMES[0])

  const handleChangeName = (e) => setName(e.target.value)

  return (
    <div>
      <select value={name} onChange={handleChangeName}>
        {PLAYER_NAMES.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <LineChart options={getOptions(name)} />
    </div>
  )
}
