import { Radar } from '@ant-design/charts'
import React, { memo } from 'react'

//atlasList 列表数据 [{name:'',star:''}]
//aliasStr  鼠标浮上去显示的框框内的别名
//fillOpacity 填充区域的透明度
//fill  填充区域的颜色
//alternateColor  图形相间的颜色
//lineColor 线的颜色
//atlasWidth 分析图宽
//atlasHeight 分析图长
//atlasSpan 分析图跨度
//atlasParag 你需要有几个圈

export default memo(function ({
  atlasList = [],
  aliasStr,
  fillOpacity = 0.2,
  fill = 'rgb(60, 110, 238)',
  alternateColor = 'rgba(0, 0, 0, 0.04)',
  lineColor = 'rgb(60, 110, 238)',
  atlasWidth = 250,
  atlasHeight = 250,
  atlasSpan = 25,
  atlasParag = 4,
  atlasMin = 0,
  atlasMax = 100
}) {
  let spanList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    .splice(0, atlasParag + 1)
    .map(item => item * atlasSpan + '')

  const config = {
    data: atlasList,
    xField: 'name',
    yField: 'star',
    width: atlasWidth,
    height: atlasHeight,
    appendPadding: [0, 15, 15, 15],
    meta: {
      star: {
        alias: aliasStr, //字段别名
        min: atlasMin,
        max: atlasMax,
        nice: true,
        formatter: v => v,
        values: spanList //用来控制有几个圈
      }
    },
    xAxis: {
      tickLine: null
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: alternateColor
      }
    },
    // 开启辅助点
    point: {
      size: 2
    },
    lineStyle: {
      fill: fill,
      fillOpacity: fillOpacity,
      cursor: 'pointer',
      stroke: lineColor
    }
  }
  return <Radar {...config} />
})
