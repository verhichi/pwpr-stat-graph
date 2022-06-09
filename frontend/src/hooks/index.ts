import axios, { AxiosResponse } from 'axios'
import { SeriesOptionsType } from 'highcharts'
import { useEffect, useState } from 'react'

import { tPlayerData } from '@/types'

export const useInit = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [names, setNames] = useState<string[]>([])
  const [dates, setDates] = useState<string[]>([])
  const [series, setSeries] = useState<{ [key: string]: SeriesOptionsType[] } | null>(
    null,
  )

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get<any, AxiosResponse<tPlayerData[]>>('/api/players')
      const rawData = data.data
      const dataNames = [...new Set(rawData.map((data) => data.name))]
      const dataDates = [...new Set(rawData.map((data) => data.date))]
      setNames(dataNames)
      setDates(dataDates)

      const dataSeries = dataNames.reduce((obj, name) => {
        const pitchingSpeed: SeriesOptionsType = {
          name: '球速',
          type: 'line',
          data: [],
          tooltip: {
            valueSuffix: ' km/s',
          },
        }
        const control: SeriesOptionsType = {
          name: `コントロール`,
          type: 'line',
          data: [],
          dashStyle: 'ShortDot',
          yAxis: 1,
        }
        const stamina: SeriesOptionsType = {
          name: `スタミナ`,
          type: 'line',
          data: [],
          dashStyle: 'LongDash',
          yAxis: 1,
        }
        const nameDateMatch = dataDates.map(
          (date) =>
            rawData.find((data) => data.date === date && data.name === name) || null,
        )

        nameDateMatch.forEach((data) => {
          pitchingSpeed.data = [
            ...(pitchingSpeed.data || []),
            data?.pitching_speed || null,
          ]
          control.data = [...(control.data || []), data?.control || null]
          stamina.data = [...(stamina.data || []), data?.stamina || null]
        })
        return { ...obj, [name]: [pitchingSpeed, control, stamina] }
      }, {})

      setLoading(true)
      setSeries(dataSeries)
      setLoading(false)
    }

    fetchData()
  }, [])

  return {
    names,
    dates,
    series,
    loading,
  }
}
