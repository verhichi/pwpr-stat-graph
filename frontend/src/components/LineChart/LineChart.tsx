import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { LineChartProps } from '.'

export const LineChart = (props: LineChartProps) => (
  <HighchartsReact highcharts={Highcharts} {...props} />
)
