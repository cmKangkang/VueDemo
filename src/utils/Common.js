//判断对象是否没有属性，如{}或者[]
function isEmptyObj(o) {
  for (var attr in o) return !1;
  return !0
}

function processArray(arr) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === null || arr[i] === undefined) arr.splice(i, 1);
    else if (typeof arr[i] == 'object') removeNullItem(arr[i], arr, i);
  }
  return arr.length == 0
}

function proccessObject(o) {
  for (var attr in o) {
    if (!o[attr] || o[attr] == ' ') delete o[attr];
    else if (typeof o[attr] == 'object') {
      removeNullItem(o[attr]);
      if (isEmptyObj(o[attr])) delete o[attr];
    }
  }
}

function removeNullItem(o, arr, i) {
  var s = ({}).toString.call(o);
  if (s == '[object Array]') {
    if (processArray(o) === true) {//o也是数组，并且删除完子项，从所属数组中删除
      if (arr) arr.splice(i, 1);
    }
  } else if (s == '[object Object]') {
    proccessObject(o);
    if (arr && isEmptyObj(o)) arr.splice(i, 1);
  }
}

function deepClone(data){
   var type = typeof data;
   var obj;
   if(type === 'object'){  
      obj = Array.isArray(data) ? [] : {};
   } else {
       //不再具有下一层次
       return data;
   }
   if(type === 'array'){
       for(var i = 0, len = data.length; i < len; i++){
           obj.push(deepClone(data[i]));
       }
   } else if(type === 'object'){
       for(var key in data){
           obj[key] = deepClone(data[key]);
       }
   }
   return obj;
}

// 全局函数暴露出去
export default {
  install(Vue, options) {
    Vue.prototype.removeNullItem = removeNullItem;
  },
  clone(data){
    return deepClone(data)
  }
}
