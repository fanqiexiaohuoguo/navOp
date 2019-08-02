// 一.准备数据结构,初始化数据
var keys={
    0:['q','w','e','r','t','y','u','i','o','p'],
    1:['a','s','d','f','g','h','j','k','l'],
    2:['z','x','c','v','b','n','m'],
    length:3
}
var hash={
    'q':'qq.com',
    'w':'weibo.com',
    'e':undefined,
    'r':undefined,
    't':'taobao.com',
    'y':'youtube.com',
    'u':'uc.com',
    'i':'iqiyi.com', 
    'p':undefined,
    'a':'acfun.tv',
    'd':'douban.com',
    'b':'bilibili.com',
    'm':'www.mcdonalds.com.cn'
}
// 二.生成键盘
// 6.读取进度
// 取出localStorage中的userChange桶中存的东西 有细节需要扣null
var hashInLocalStorage=getFromLocalStorage('userChange')
// 如果不是空值，就用取出的值覆盖当前hash
if(hashInLocalStorage){
    hash=hashInLocalStorage
}
// 2.创建键盘元素
var index=0
for(var index =0; index<keys.length;index++){
    var div=document.createElement('div')
    var row=keys[index]

    maincontent.appendChild(div)

    for(var index2=0;index2<row.length;index2++){

        var span=document.createElement('span')
        span.className='text'
        span.textContent=row[index2]  

        var buttonEdit=document.createElement("button")
        buttonEdit.textContent="编辑"
        //找到用户当前点击的元素,使用id进行标记
        buttonEdit.id=row[index2]
        buttonEdit.onclick=function(curButton){
            button2=curButton.target
            curK=curButton.target.id
            newHref=prompt("请输入一个新网址")
            hash[curK]=newHref
            img2=button2.previousSibling
            img2.src="http://"+newHref+"/favicon.ico"
            img2.onerror=function(event){
                event.target.src="./rep.png"
            }
            //5.保存进度，存此次变更后的hash,使用localStorage存用户编辑信息
            localStorage.setItem('userChange',JSON.stringify(hash))
        }
       
        var imgFavicon=document.createElement("img")
        if (hash[row[index2]]){
            imgFavicon.src="http://"+hash[row[index2]]+"/favicon.ico"
        }
        else{
            imgFavicon.src="./rep.png"
        }
        //拿到图片但是出错了
        imgFavicon.onerror=function(event){
            event.target.src="./rep.png"
        }
              
        var kbd=document.createElement('kbd')
        kbd.className='keyStyle'
        kbd.appendChild(span)
        kbd.appendChild(imgFavicon)
        kbd.appendChild(buttonEdit)

        div.appendChild(kbd)     
    }
    
}       
// 三.监听键盘事件
document.onkeypress=function(curKbd){
    curKey=curKbd.key
    website=hash[curKey]
    window.open("http://"+website,"_blank")//新开一个标签页打开
}

function getFromLocalStorage(name){
    return JSON.parse(localStorage.getItem(name)||'null')
}
function tag(tagName,attributes){
    var element=document.createElement(tagName)
    for(var key in attributes){
        element.key=attributes[key]
    }
    return element
}