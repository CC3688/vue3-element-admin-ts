import * as echarts from 'echarts/core'
import {
  BarChart,
  BarSeriesOption,
  // 系列类型的定义后缀都为 SeriesOption
  LineChart,
  LineSeriesOption,
  PieChart,
  PieSeriesOption,
  GaugeChart,
} from 'echarts/charts'
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components'
// import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | LineSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | TooltipComponentOption
  | DatasetComponentOption
  | LegendComponentOption
  | BarSeriesOption
  | PieSeriesOption
>

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  DatasetComponent,
  GridComponent,
  LineChart,

  GaugeChart,
  PieChart,
  CanvasRenderer,
  LegendComponent,
  BarChart,
])

export default echarts
