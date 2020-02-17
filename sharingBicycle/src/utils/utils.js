export default {
  formateDate(){
    let data=new Date();
    return (data.getFullYear()+'/'+(data.getMonth()+1)+'/'+data.getDate()+'/'+' '+
    data.getHours()+':'+data.getMinutes()+':'+data.getSeconds())
  },
  pagination(data,callback){
    return{
      current:data.page,
      pageSize:data.page_size,
      total:data.total_count,
      showQuickJumper:true,
      showTotal:()=>{
        return `共${data.total_count}条`
      },
      onChange:(current)=>{
          callback(current)
      }
    }
  }
}