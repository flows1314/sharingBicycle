import React from 'react'
//方式一，导入所有图标
// import echarts from 'echarts' 
import echartsTheme from '../Theme'
//方法二，按需加载
import echarts from 'echarts/lib/echarts'
//导入饼形图
import 'echarts/lib/chart/pie'
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
                text: "手机销售总量分布",
                left:'center'  //主标题文本text的水平对齐方式，
                //如果 left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐
            },
            legend:{
                orient:'vertical',//图例列表的布局朝向
                right:"5%",
                top:"30%",
                bottom:"20%",
                data:['苹果' ,'华为' ,'VIVO' ,'VIVO' ,'小米' ]
            },
            tooltip:{
                trigger:'item',//数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
                //提示框浮层内容格式器，支持字符串模板和回调函数两种形式
                formatter:'{a}：{c}<br />{b} ({d}%)'
            },
            series: [
                {
                    name: '销量',
                    type: 'pie',
                    // radius:"80%",  //不写默认大小
                    //饼图的半径,可数字字符串，数组[]时，
                    //数组的第一项是内半径，第二项是外半径
                    center:['50%','55%'],//饼图的中心（圆心）坐标，
                    //数组的第一项是横坐标，第二项是纵坐标
                    data: [
                        { value: 110, name: '苹果' }, { value: 180, name: '华为' },
                        { value: 80, name: 'VIVO' }, { value: 150, name: 'VIVO'  },
                        { value: 180, name: '小米' }
                    ]
                },
            ]
        }
        return option
    }

    getOption2() {
        const option = {
            title: {
                text: "手机销售总量分布",
                left:'left'  //主标题文本text的水平对齐方式，
                //如果 left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐
            },
            legend:{
                orient:'vertical',//图例列表的布局朝向
                right:"5%",
                top:"30%",
                bottom:"20%",
                data:['苹果' ,'华为' ,'VIVO' ,'VIVO' ,'小米' ]
            },
            tooltip:{
                trigger:'item',//数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
                //提示框浮层内容格式器，支持字符串模板和回调函数两种形式
                formatter:'{a}：{c}<br />{b} ({d}%)'
            },
            series: [
                {
                    name: '销量',
                    type: 'pie',
                    radius:["50%","90%"],  //不写默认大小
                    //饼图的半径,可数字字符串，数组[]时，
                    //数组的第一项是内半径，第二项是外半径
                    center:['50%','55%'],//饼图的中心（圆心）坐标，
                    //数组的第一项是横坐标，第二项是纵坐标
                    data: [
                        { value: 110, name: '苹果' }, { value: 180, name: '华为' },
                        { value: 80, name: 'VIVO' }, { value: 150, name: 'VIVO'  },
                        { value: 180, name: '小米' }
                    ]
                },
            ]
        }
        return option
    }

    getOption3() {
        const option = {
            //背景颜色
            // backgroundColor:'#2c343c',
            title: {
                text: "南丁格尔图",
                left:'left',
                textStyle: {
                    color: 'red'   //设置标题颜色
                }
            },
            legend:{
                orient:'vertical',
                right:"5%",
                top:"30%",
                bottom:"20%",
                data:['苹果' ,'华为' ,'VIVO' ,'VIVO' ,'小米' ]
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}：{c}<br />{b} ({d}%)'
            },
            series: [
                {
                    name: '销量',
                    type: 'pie',
                    data: [
                        { value: 110, name: '苹果' }, { value: 180, name: '华为' },
                        { value: 80, name: 'VIVO' }, { value: 150, name: 'VIVO'  },
                        { value: 180, name: '小米' }
                    ].sort((a,b)=>{return a.value-b.value}),
                    //南丁格尔图，通过半径区分数据大小
                    //'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小
                    roseType:'radius',
                    //饼图图形上的文本标签，可用于说明图形的一些数据信息
                    label: {
                        color: 'rgba(55, 25, 155, 0.3)'//文字的颜色
                    },
                    //视觉引导线样式
                    labelLine: {
                        lineStyle: {
                            color: 'rgba(15, 20, 25, 0.3)'//线的颜色
                        },
                        //是否平滑视觉引导线，默认不平滑，可以设置成 true 平滑显示，也可以设置
                        //为 0 到 1 的值，表示平滑程度。
                        smooth: 0.2,
                        //视觉引导线第一段的长度
                        length: 20,
                        //视觉引导线第二段的长度
                        length2: 30
                    },
                    //图形样式。
                    itemStyle: {
                        //图形的颜色。 默认从全局调色盘 option.color 获取颜色
                        // color: '#c23531',

                        //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, 
                        //shadowOffsetY 一起设置图形的阴影效果。
                        shadowBlur: 200,
                        //阴影颜色
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                }
            ]
        }
        return option
    }

    render() {
        return (
            <div>
                <Card title='饼图图表一'>
                    <ReactEcharts option={this.getOption()} theme="Imock" />
                </Card>
                <Card title='饼图图表二' style={{ marginTop: 20 }}>
                    <ReactEcharts option={this.getOption2()} theme="Imock" />
                </Card>
                <Card title='饼图图表三' style={{ marginTop: 20 }}>
                    <ReactEcharts option={this.getOption3()} theme="Imock" />
                </Card>
            </div>

        )
    }
}
export default Echars;