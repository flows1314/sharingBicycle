import React from 'react'
//方式一，导入所有图标
// import echarts from 'echarts' 
import echartsTheme from '../Theme'
//方法二，按需加载
import echarts from 'echarts/lib/echarts'
//导入饼形图
import 'echarts/lib/chart/line'
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
            title: {
                text: "销售趋势",
                left:'left'  //主标题文本text的水平对齐方式，
            },
            xAxis:{
                //坐标轴类型。
                //'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据
                type:'category',
                data:['2016年' ,'2017年' ,'2018年' ,'2019年' ,'2020年']
            },
            yAxis:{
                type:'value'
            },
            tooltip:{
                trigger:'axis',//坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
                //提示框浮层内容格式器，支持字符串模板和回调函数两种形式
                formatter:'{a}：{c}<br />{b}'
            },
            series: [
                {
                    name: '销量',
                    type: 'line',
                    data: [100 ,500 ,600 ,1000 ,900 ]
                },
            ]
        }
        return option
    }

    getOption2() {
        const option = {
            title: {
                text: "销售趋势",
                left:'left'  //主标题文本text的水平对齐方式，
            },
            legend:{
                orient:'horizontal',//图例列表的布局朝向
                data:['苹果' ,'华为']
            },
            xAxis:{
                //坐标轴类型。
                //'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据
                type:'category',
                data:['2016年' ,'2017年' ,'2018年' ,'2019年' ,'2020年']
            },
            yAxis:{
                type:'value'
            },
            tooltip:{
                trigger:'axis',//坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
                //提示框浮层内容格式器，支持字符串模板和回调函数两种形式
            },
            series: [
                {
                    name: '苹果',
                    type: 'line',
                    data: [10 ,500 ,600 ,400 ,900 ]
                },
                {
                    name: '华为',
                    type: 'line',
                    data: [80 ,180 ,300 ,490 ,400 ]
                },
            ]
        }
        return option
    }

    getOption3() {
        const option = {
            title: {
                text: "销售趋势",
                left:'center'  //主标题文本text的水平对齐方式，
            },
            xAxis:{
                //坐标轴类型。
                //'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据
                type:'category',
                //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
                //类目轴中 boundaryGap 可以配置为 true 和 false。默认为 true，这时候刻度
                //只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。
                boundaryGap: false,
                data:['2016年' ,'2017年' ,'2018年' ,'2019年' ,'2020年']
            },
            yAxis:{
                type:'value'
            },
            tooltip:{
                trigger:'axis',//坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
                //提示框浮层内容格式器，支持字符串模板和回调函数两种形式
                formatter:'{a}：{c}<br />{b}'
            },
            series: [
                {
                    name: 'VIVO',
                    type: 'line',
                    data: [100 ,500 ,600 ,1000 ,900 ],
                    //区域填充样式,无参数默认主题色
                    areaStyle: {}
                },
            ]
        }
        return option
    }

    render() {
        return (
            <div>
                <Card title='折线图图表一'>
                    <ReactEcharts option={this.getOption()} theme="Imock" />
                </Card>
                <Card title='折线图图表二' style={{ marginTop: 20 }}>
                    <ReactEcharts option={this.getOption2()} theme="Imock" />
                </Card>
                <Card title='折线图图表三' style={{ marginTop: 20 }}>
                    <ReactEcharts option={this.getOption3()} theme="Imock" />
                </Card>
            </div>

        )
    }
}
export default Echars;