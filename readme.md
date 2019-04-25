类型选择组件
===


####调用
```html
var option = {
    data:typelist,
    wrapper:'#select-con',
    ulf:'#first-type',
    uls:'#sec-type',
    ult:'#third-type',
    showInput:'#ld-type',
    hideInput:'#ld-value'
};
$('.select-wrapper').typeselect(option);
```

####option说明：
        data:组件数据，格式详情在json文件里定义
        wrapper：三列ul的包含标签id
        ulf：第一列ul标签的id
        uls：第二列ul标签的id
        ult：第三列ul标签的id
        showInput：显示选择项的input id
        hideInput：存有选项值的input id

---
        20190425 liy
        
