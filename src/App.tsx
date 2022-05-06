import Highcharts from 'highcharts'

import { LineChart } from '@/components/LineChart'
import { rawData } from '@/data'

const xCategories = [...new Set(rawData.map((value) => value.date))].sort()

const davidPS = rawData
  .filter((value) => value.name === 'Brian')
  .map((value) => parseInt(value.pitching_speed))

const davidControl = rawData
  .filter((value) => value.name === 'Brian')
  .map((value) => parseInt(value.control))

const davidStamina = rawData
  .filter((value) => value.name === 'Brian')
  .map((value) => parseInt(value.stamina))

console.log({ xCategories, davidPS, davidControl, davidStamina })

const options: Highcharts.Options = {
  chart: {
    zoomType: 'xy',
  },
  title: {
    text: 'パワプロ2022 投手成長グラフ',
  },
  subtitle: {
    text: '栄冠ナイン 3年縛り',
  },
  xAxis: [
    {
      categories: xCategories,
      crosshair: true,
    },
  ],
  yAxis: [
    {
      // Primary yAxis
      title: {
        text: '球速',
        // style: {
        //   color: Highcharts.getOptions().colors[2],
        // },
      },
      labels: {
        format: '{value} km/s',
        // style: {
        //   color: Highcharts.getOptions().colors[2],
        // },
      },
      min: 80,
      max: 175,
    },
    {
      // Secondary yAxis
      gridLineWidth: 0,
      title: {
        text: 'コントロール / スタミナ',
        // style: {
        //   color: Highcharts.getOptions().colors[0],
        // },
      },
      labels: {
        // style: {
        //   color: Highcharts.getOptions().colors[0],
        // },
      },
      opposite: true,
      min: 0,
      max: 100,
    },
  ],
  tooltip: {
    shared: true,
  },
  legend: {
    layout: 'vertical',
    align: 'left',
    x: 80,
    verticalAlign: 'top',
    y: 55,
    floating: true,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)',
  },
  series: [
    {
      name: '球速',
      type: 'line',
      data: davidPS,
      tooltip: {
        valueSuffix: ' km/s',
      },
    },
    {
      name: 'コントロール',
      type: 'line',
      data: davidControl,
      dashStyle: 'ShortDot',
      yAxis: 1,
    },
    {
      name: 'スタミナ',
      type: 'line',
      data: davidStamina,
      dashStyle: 'LongDash',
      yAxis: 1,
    },
  ],
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            floating: false,
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            x: 0,
            y: 0,
          },
          yAxis: [
            {
              labels: {
                align: 'right',
                x: 0,
                y: -6,
              },
              showLastLabel: false,
            },
            {
              labels: {
                align: 'left',
                x: 0,
                y: -6,
              },
              showLastLabel: false,
            },
            {
              visible: false,
            },
          ],
        },
      },
    ],
  },
}

export const App = () => {
  return (
    <div>
      <LineChart options={options} />
    </div>
  )
}
