// 一.准备数据结构,初始化数据
var hashA=init()
var keys=hashA["keys"]
var hash=hashA["hash"]

// 二.生成键盘
generateKeyboard(keys,hash)

// 三.监听键盘事件
listenToUser(hash)

//下面是工具函数
function init(){
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
    var hashInLocalStorage=getFromLocalStorage('userChange')
    if(hashInLocalStorage){
        hash=hashInLocalStorage
    }
    return {
        "keys":keys,
        "hash":hash
    }
}
function generateKeyboard(keys,hash){
    for(var index =0; index<keys.length;index++){
        var div=document.createElement('div')
        maincontent.appendChild(div)
    
        var row=keys[index]
    
        for(var index2=0;index2<row.length;index2++){
            var span=createSpan(row[index2])
    
            var buttonEdit=createButton(row[index2])
           
            var imgFavicon=createImg(hash[row[index2]],'./rep.png')
                  
            var kbd=document.createElement('kbd')
            kbd.className='keyStyle'
    
            kbd.appendChild(span)
            kbd.appendChild(imgFavicon)
            kbd.appendChild(buttonEdit)
    
            div.appendChild(kbd)     
        }  
    }       
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
function createSpan(textContent){
    var span=document.createElement('span')
    span.className='text'
    span.textContent=textContent  

    return span
}
function createButton(id){
    var button=document.createElement("button")
    button.textContent="编辑"
    button.id=id
    button.onclick=function(curButton){
        button2=curButton.target
        curK=curButton.target.id
        newHref=prompt("请输入一个新网址")
        hash[curK]=newHref
        img2=button2.previousSibling
        img2.src="http://"+newHref+"/favicon.ico"
        img2.onerror=function(event){
            event.target.src="./rep.png"
            }
        localStorage.setItem('userChange',JSON.stringify(hash))
    }
    return button
}
function createImg(domain,repHref){
    var img=document.createElement("img")
    if (domain){
        img.src="http://"+domain+"/favicon.ico"
    }
    else{
        img.src=repHref
    }
    img.onerror=function(event){
        event.target.src=repHref
    }
    return img
}
function listenToUser(hash){
    document.onkeypress=function(curKbd){
        curKey=curKbd.key
        website=hash[curKey]
        window.open("http://"+website,"_blank")
    }    
}