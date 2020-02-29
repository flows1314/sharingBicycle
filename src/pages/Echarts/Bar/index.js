import React from 'react'
//方式一，导入所有图标
// import echarts from 'echarts' 
import echartsTheme from '../Theme'
//方法二，按需加载
import echarts from 'echarts/lib/echarts'
//导入柱形图
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/title'
import ReactEcharts from 'echarts-for-react'
import { Card } from 'antd';
class Echars extends React.Component {
    componentWillMount() {
        echarts.registerTheme("Imock", echartsTheme)
    }
    getOption() {
        const option = {
            //调色盘颜色列表。如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色。
            // color: ['#b6a2de'],
            //标题组件，包含主标题和副标题。
            title: {
                text: "用户骑行订单",    //主标题文本，支持使用 \n 换行。
            },
            //提示框组件。
            tooltip: {
                trigger: 'axis',          //触发类型。axis是坐标轴触发
                axisPointer: {            // 坐标轴指示器配置项，坐标轴触发有效
                    type: 'shadow'        // 指示器类型。默认为直线，可选为：'line' | 'shadow'
                }
            },
            //直角坐标系内绘图网格
            grid: {
                left: '2%',           //grid 组件离容器左侧的距离。
                right: '2%',
                bottom: '2%',
                containLabel: true,   //grid 区域是否包含坐标轴的刻度标签。
            },
            //直角坐标系 grid 中的 x 轴
            xAxis: [
                {
                    type: 'category',//坐标轴类型。'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
                    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                    axisTick: {//坐标轴刻度相关设置。
                        alignWithLabel: true,//类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
                    }
                }
            ],
            //直角坐标系 grid 中的 y 轴，
            yAxis: [
                {
                    type: 'value',//坐标轴类型.'value' 数值轴，适用于连续数据。
                }
            ],
            series: [   //系列列表。每个系列通过 type 决定自己的图表类型
                {
                    name: '订单量',
                    type: 'bar',
                    barWidth: '60%',
                    data: [40, 52, 200, 334, 400, 330, 220]
                }
            ]
        };
        return option
    }

    getOption2() {
        const option = {
            // color: ['#b6a2de'],
            title: {
                text: "用户骑行订单", 
            },
            //图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 
            //name（如果是饼图，也可以是饼图单个数据的 name）
            //如果 data 没有被指定，会自动从当前系列中获取。多数系列会取自 series.name 
            //或者 series.encode 的 seriesName 所指定的维度。如 饼图 and 漏斗图 等会取自 series.data 中的 name。
            legend:{  
            //自定义样式，把该项写成配置项对象。使用 name 属性对应表示系列的 name。
                data: ["OFO",{
                    name: '摩拜',
                    // 强制设置图形为圆。
                    icon: 'circle',
                    // 设置文本为红色
                    textStyle: {
                        color: 'red'
                    }
                },"小蓝"]                  
            },
            tooltip: {
                trigger: 'axis',          
                axisPointer: {            
                    type: 'shadow'     
                }
            },
            grid: {
                left: '2%',         
                right: '2%',
                bottom: '2%',
                containLabel: true,  
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                    axisTick: {
                        alignWithLabel: true,
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                }
            ],
            series: [  
                {
                    name: 'OFO',
                    type: 'bar',
                    data: [300, 52, 200, 334, 400, 330, 220]
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [100, 42, 110, 234, 500, 230, 320]
                },
                {
                    name: '小蓝',
                    type: 'bar',
                    data: [430, 102, 300, 434, 500, 430, 120]
                },
            ]
        };
        return option

    }
    render() {
        return (
            <div>
                <Card title='柱状图表一'>
                    <ReactEcharts option={this.getOption()} theme="Imock" />
                </Card>
                <Card title='柱状图表二' style={{marginTop:20}}>
                    <ReactEcharts option={this.getOption2()} theme="Imock" />
                </Card>
            </div>

        )
    }
}
export default Echars;