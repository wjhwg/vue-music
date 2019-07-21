<template>
  <div class="content">
    <div class="power">
      <div v-for="(permissionTop, topIndex) in tableData" :key="topIndex" @click="show(topIndex)" class="title">
        <p class="checkGroup">
          <el-checkbox :indeterminate="permissionTop.indeterminate" :key="topIndex" v-model="permissionTop.mychecked" :label="permissionTop.permissionId" @change="onChangeTop(topIndex, permissionTop.permissionId, $event)">{{permissionTop.permissionName}}</el-checkbox>
        </p>
        <div class="child" v-for="permissionSon in permissionTop.childrenList" :key="permissionSon.permissionId" v-show="permissionTop.display">
          <el-checkbox v-model="permissionSon.mychecked" @change="onChangeSon(topIndex, permissionSon.permissionId, permissionTop.permissionId, $event)" :label="permissionSon.permissionId">{{permissionSon.permissionName}}</el-checkbox>
        </div>
      </div>
    </div>
    <div class="power">
      <div v-for="(permissionTops, topIndexs) in rightData" :key="topIndexs" @click="shows(topIndexs)" class="title">
        <p class="checkGroup">
          {{permissionTops.permissionName}}
        </p>
        <div class="child" v-for="permissionSon in permissionTops.childrenList" :key="permissionSon.permissionId" v-show="permissionTops.displays">
          {{permissionSon.permissionName}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  // components: {
  //   HelloWorld
  // }

data(){
  return{
    tableData: [
    {
        "childrenList": [
            {"mychecked": false,"indeterminate": false,"parentPermId": 15,"permissionId": 21,"permissionName": "订单","showFlag": "1"},
            {"mychecked": false,"indeterminate": false,"parentPermId": 15,"permissionId": 22, "permissionName": "用户","showFlag": "1"},
            {"mychecked": false,"indeterminate": false,"parentPermId": 15, "permissionId": 23,"permissionName": "导出订单","showFlag": "1"},
            {"mychecked": false,"indeterminate": false,"parentPermId": 15, "permissionId": 24, "permissionName": "导出用户","showFlag": "1"}
        ],
        "permissionName": "用户服务","mychecked": false,"indeterminate": false,"parentPermId": 0,"permissionId": 15,"showFlag": "1"
    },
    {
        "childrenList": [
            {"mychecked": false,"indeterminate": false,"parentPermId": 16,"permissionId": 25,"permissionName": "内容查看","showFlag": "1"},
            {"mychecked": false,"indeterminate": false,"parentPermId": 16,"permissionId": 26,"permissionName": "内容采纳","showFlag": "1"},
            {"mychecked": false,"indeterminate": false,"parentPermId": 16,"permissionId": 27,"permissionName": "分销中心","showFlag": "1"},
            {"mychecked": false,"indeterminate": false,"parentPermId": 16,"permissionId": 28,"permissionName": "我的商城","showFlag": "1"}
        ],
        "permissionName": "内容商城","mychecked": false,"indeterminate": false,"parentPermId": 0,"permissionId": 16,"showFlag": "1"
    }],
    activeName: 'accountManage',
    people:'',
    phoneNum:'',
    isIndeterminate:true,
    rightData: []
    }
  },
  methods: {
    onChangeTop(index, topId, e){//父级change事件
        this.tableData[index].mychecked = e//父级勾选后，子级全部勾选或者取消
        if(e == false) this.tableData[index].indeterminate = false //去掉不确定状态
        var childrenArray = this.tableData[index].childrenList
        if(childrenArray)
        for(var i=0,len=childrenArray.length; i<len; i++)
        childrenArray[i].mychecked = e
        if(e === true){
          this.rightData.push(this.tableData[index]);
        }else{
          this.rightData.pop(this.tableData[index]);
        }
    },
    show(index){
      if(this.tableData[index].hasOwnProperty('display')){
        this.tableData[index].display === true ? this.$set(this.tableData[index], 'display', false) : this.$set(this.tableData[index], 'display', true);
      }else {
        this.$set(this.tableData[index], 'display', true);
      }
      // console.log(index)
    },
    shows(index){
      if(this.rightData[index].hasOwnProperty('displays')){
        this.rightData[index].displays === true ? this.$set(this.rightData[index], 'displays', false) : this.$set(this.rightData[index], 'displays', true);
      }else {
        this.$set(this.rightData[index], 'displays', true);
      }
    },
    onChangeSon(topIndex, sonId, topId, e){//子级change事件
        var childrenArray = this.tableData[topIndex].childrenList
        var tickCount = 0, unTickCount = 0, len = childrenArray.length
        for(var i = 0; i < len; i++){
            if(sonId == childrenArray[i].permissionId) childrenArray[i].mychecked = e 
            if(childrenArray[i].mychecked == true) tickCount++
            if(childrenArray[i].mychecked == false) unTickCount++
        }
        if(tickCount == len) {//子级全勾选
            this.tableData[topIndex].mychecked = true 
            this.tableData[topIndex].indeterminate = false
        } else if(unTickCount == len) {//子级全不勾选
            this.tableData[topIndex].mychecked = false 
            this.tableData[topIndex].indeterminate = false
        } else {
            this.tableData[topIndex].mychecked = true 
            this.tableData[topIndex].indeterminate = true //添加不确定状态
        }
        let parent = this.tableData.filter(res => {
          if(res.indeterminate === true){
            // let child = res.childrenList.filter(re => {
            //   return re.mychecked === true
            // })
            // console.log(child)
            this.getChild(res)
            return res
          }
        });
        console.log(parent) 
    },
    getChild(res){
      res.childrenList.forEach((data, i) => {
        if(data.mychecked !== true){
          console.log(i)
        }
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.checkGroup{
  display: inline-block;
  margin: 0;
  padding: 0;
  width:450px !important;
  height:54px;
  line-height: 54px;
  background:rgba(250,250,250,1);
  border-top: 1px solid #ddd;
}
.power {
  overflow: hidden;
  width: 50%;
  display: inline-block;
  float: left;
}
.child{
  width:450px;
  height:54px;
  padding-left: 50px;
  box-sizing: border-box;
  line-height: 54px;
  border-top: 1px solid #ddd;
}
</style>
