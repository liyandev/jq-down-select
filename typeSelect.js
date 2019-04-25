/*

*/
(function(factory) {
  if (
    typeof exports === "object" &&
    exports &&
    typeof module === "object" &&
    module &&
    module.exports === exports
  ) {
    // Browserify. Attach to jQuery module.
    factory(require("jquery"));
  } else if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], factory);
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function($) {
  var _default = {
    data:[],
    wrapper:'#select-con',
    ulf:'#first-type',
    uls:'#sec-type',
    ult:'#third-type',
    showInput:'#ld-type',
    hideInput:'#ld-value'
  };
  var settings = {},
      typedata = [];

  var methods = {
    /*
    初始化下拉框
    */
    initSelect:function(option){
      var self = this;
      settings = $.extend({}, _default, option);
      typedata = settings.data;
      self.initList('#first-type',typedata);
      var sec = typedata[0].child;
      self.initList('#sec-type',sec);  
      var third = sec[0].child;
      self.initList('#third-type',third);  
      self.initActive();
      self.clickListener();
      self.showValue('#ld-type','#ld-value');
    },

    /*
    修改各列
    pele:ul的id,
    data:该列数组
    */
    initList:function(pele,data){
      var ele = "";
      for(let i=0,len=data.length;i<len;i++){
        ele += "<li ";
        if(data[i].child.length > 0){
          ele += "class='more'"
        }
        ele += " id='"+data[i].id+"'>"+data[i].name+"</li>";
      }
      $(pele).empty().append($(ele));
    },

    /*
    初始化各列默认项
    */
    initActive:function(){
      var self = this;
      self.defaultActive(settings.ulf);
      self.defaultActive(settings.uls);
      self.defaultActive(settings.ult);
    },

    /*
    修改默认项
    pid:ul的id
    */
    defaultActive:function(pid){
      $(pid).children('li').eq(0).addClass('sl-active');
    },

    /*
    点击事件绑定监听
    */
    clickListener:function(){
      var self = this;

      $(settings.showInput).on('click',function(){
        $(settings.wrapper).toggle();
        $('#s-arrow').toggleClass('s-turn-arrow')
      });

      $(settings.wrapper).on('click','li',function(e){
        var id = this.id;
        var pid = $(this).parent('ul')[0].id;
        var secdata,thirddata;
        self.changeActive(this);
        
        if(pid == 'first-type'){
          self.cleardata(2);
          var cur = self.findIndex(id,typedata);
          if(typedata[cur] && typedata[cur].hasOwnProperty('child')){
            secdata = typedata[cur].child;
            self.initList('#sec-type',secdata);
            self.defaultActive('#sec-type');
          }
          if(secdata[0] && secdata[0].hasOwnProperty('child')){
            thirddata = secdata[0].child;
            self.initList('#third-type',thirddata);
            self.defaultActive('#third-type');
          } 
        }else if(pid == 'sec-type'){
          self.cleardata(1);
          var fid = $('#first-type li.sl-active').attr('id');
          var fidx = self.findIndex(fid,typedata);
          if(typedata[fidx] && typedata[fidx].hasOwnProperty('child')){
            secdata = typedata[fidx].child;
            cur = self.findIndex(id,secdata);        
          }
          if(secdata[cur] && secdata[cur].hasOwnProperty('child')){
            thirddata = secdata[cur].child;
            self.initList('#third-type',thirddata);
          }
        }else{
          
        }

        self.showValue('#ld-type','#ld-value');
      });
    },

    /*
    查找id在数组中的位置
    */
    findIndex:function(id,arr){
      var i = -1;
      arr.find(function(val,index,arr){
        if(val.id == id){
          i = index;
        }
      });
      return i;
    },

    /*
    修改选中项样式
    */
    changeActive:function(_this){
      $(_this).siblings('li').removeClass('sl-active');
      $(_this).addClass('sl-active');
    },

    /*
    清理数据
    1：清理第三列
    2：清理二、三列
    */
    cleardata:function(i){
      if(i>1){
        $(settings.uls).empty();
        $(settings.ult).empty();
      }else{
        $(settings.ult).empty();
      }
    },

    /*
    修改input显示值
    ele:对外显示input的id
    vele:input hidden 的id
    */
    showValue:function(ele,vele){
      var $at = $('.sl-active');
      var val = "";
      var len = $at.length;
      for(let i=0;i<len;i++){
        if(i == 0){
          val += $at[i].innerText;
        }else{
          val += '/'+$at[i].innerText;
        } 
      }
      $(ele).val(val);
      $(vele).val($at[len-1].id);
    }
  }

  $.fn.typeselect = function(option){
    methods.initSelect(option);
  }
});