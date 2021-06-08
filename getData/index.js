// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var db=cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  var skipPage = event.skipPage
  var filter = event.filter
  var slider = event.slider

  if(filter=="University" || filter=="AnnualCost" || filter=="Expenses"  || filter=="Tuition"){
    return await db.collection("infoList").orderBy(filter,"asc").skip(skipPage).limit(3).get()
  }else if(filter == "IncomeperCapita" || filter=="Score" || filter=="Security"){
    return await db.collection("infoList").orderBy(filter,"desc").skip(skipPage).limit(3).get()
  }else if(slider != 0){
    return await db.collection("infoList").where({
      AnnualCost:_.lte(slider)
    }).orderBy("AnnualCost","asc").skip(skipPage).limit(3).get()
  }else{
    return await db.collection("infoList").orderBy("RankingUniversity","asc").skip(skipPage).limit(3).get()
  }
  
}