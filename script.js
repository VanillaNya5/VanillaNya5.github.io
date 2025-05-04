// 辅助函数：读取特定名称的 cookie 值
function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

// 导航栏加载逻辑
document.addEventListener("DOMContentLoaded", function () {
    // 查找文档中带有 data-navbar-id 属性的所有 div
    const navbarContainer = document.querySelector("div[data-navbar-id]");
    if (navbarContainer) {
        const navbarId = navbarContainer.getAttribute("data-navbar-id"); // 获取需要加载的导航栏 ID
        fetch("/navbar.html") // 确保路径正确
            .then(response => {
                if (!response.ok) {
                    throw new Error(`无法加载导航栏文件: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                // 创建一个临时的 DOM 容器来解析 HTML
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = data;

                // 查找指定 ID 的导航栏
                const navbar = tempDiv.querySelector(`div[data-navbar-id="${navbarId}"]`);
                if (navbar) {
                    // 替换整个 div
                    navbarContainer.replaceWith(navbar);
                } else {
                    console.error(`未找到 data-navbar-id 为 "${navbarId}" 的导航栏`);
                }
            })
            .catch(error => console.error("导航栏加载失败:", error));
    }
});

//初始化inbody对象
var inbody = document.getElementsByClassName("inbody")[0];


// 页面加载时检查是否存在 'nightmode' cookie 并应用相应样式
document.addEventListener("DOMContentLoaded", function () {
    const nightMode = getCookie('nightmode'); // 获取 'nightmode' cookie 的值
    if (nightMode) {
        document.body.style.backgroundColor = '#333'; // 设置背景颜色为深色
        document.body.style.color = '#fff'; // 设置文字颜色为白色
        inbody.style.backgroundColor = "#333";
    }
});



// 选取所有的按钮并添加点击事件
document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', function() {
        // 找到最近的内容div
        const fold = this.nextElementSibling; // 获取按钮下的下一个元素（即content div）
        
        // 切换内容的显示状态
        if (fold.classList.contains('show')) { // 使用contains()方法来检查类名
            fold.classList.remove('show'); // 收起内容
        } else {
            fold.classList.add('show'); // 展开内容
        }
    });
});





//一键复制
// 选择所有带有 copybutton 类的元素
document.querySelectorAll('.copybutton').forEach(button => {
    // 为每个按钮添加点击事件
    button.onclick = () => {
        // 获取 copytext 属性
        const textToCopy = button.getAttribute('copytext');
        
        // 使用 Clipboard API 复制文本
        navigator.clipboard.writeText(textToCopy).then(() => {
            // 复制成功的提示
            alert('已复制到剪贴板: ' + textToCopy);
        }).catch(err => {
            // 复制失败的处理
            console.error('复制失败:', err);
        });
    };
});

//图片点击切换黑白
var images = document.querySelectorAll('img');
images.forEach(function(img){
    img.addEventListener('click',function(){
        if (img.style.filter === 'grayscale(100%)'){
            img.style.filter = 'none';
        } else {
            img.style.filter =  'grayscale(100%)';
        }
    });
});


//页脚
const muban = document.getElementById('muban');//获取容器

const a = document.createElement('p');//创建元素
a.textContent = '本网站由"VanillaNya5"制作';
muban.appendChild(a);

const b = document.createElement('p');//创建元素
b.textContent = '©2024 保留所有权利.';
muban.appendChild(b);

// 获取页脚元素
const body = document.querySelector('body');
// 创建图片
const bodyImage = document.createElement('img');
bodyImage.src = '/data/momo.png';
bodyImage.alt = '右下角图片';
bodyImage.style.width = '50px'; // 设置图片宽度
bodyImage.style.height = '65px'; // 设置图片高度
bodyImage.style.cursor = 'pointer'; // 鼠标悬停时显示手型
// 设置图片样式，使其在最下方并与右边保持 40px 距离
bodyImage.style.position = 'absolute'; // 绝对定位
bodyImage.style.bottom = '0'; // 距离底部 0
bodyImage.style.right = '50px'; // 距离右侧 40px
bodyImage.title = '点击桃井回到顶部！'; // 设置鼠标悬停时显示的文字
// 确保父容器是相对定位
body.style.position = 'relative';
// 将图片添加到页脚
body.appendChild(bodyImage);



//防止重复访问
// 获取当前页面的 URL
function normalizeUrl(url) {
    return url.endsWith('/') ? url.slice(0, -1) : url;
}

const currentUrl = normalizeUrl(window.location.href);

// 使用事件委托，确保动态生成的链接也能正确处理
document.addEventListener('click', function(event) {
    const link = event.target.closest('a'); // 检查点击的是否是链接
    if (link && link.origin === window.location.origin) { // 只处理同域链接
        const linkUrl = normalizeUrl(new URL(link.href, window.location.origin).href);
        if (linkUrl === currentUrl) {
            event.preventDefault(); // 阻止默认行为
            alert('您已经在这里啦~\n如果确实需要重新载入可以浏览器刷新~'); // 弹窗提醒用户
        }
    }
});



if (!getCookie('toTopDisable')) {
//回顶部
const totop = document.createElement('div');//创建容器
totop.id = 'toTop';
totop.title = '点我可以快速到达顶部哦';
muban2.appendChild(totop);
const totoptext = document.createElement('p');//创建元素
totop.textContent = '点我回顶部';
totop.appendChild(totoptext);


var toTop = document.querySelector("#toTop");    
    toTop.style.display = "none";// 一开始div隐藏  
    window.addEventListener("scroll", scrollHandler);// 然后给window加事件监听，滚动条大于某个值时，div出现
    function scrollHandler(e) {        
        var distanceY = document.documentElement.scrollTop || document.body.scrollTop;//兼容写法，获取当前页面y轴的滚动距离
        if (distanceY > 100) {
            toTop.style.display = "block";
        } else {
            toTop.style.display = "none";
        }
    }
    // 然后给div添加点击事件，用计时器interval来循环，步长为5，scrollTop依次减5，时间每50ms循环一次，直到scrollTop为0清除计时器
    toTop.addEventListener("click", clickHandler);
    function clickHandler(e) {
        let timer = setInterval(function () {
            var distanceY = document.documentElement.scrollTop || document.body.scrollTop;//兼容
            if (distanceY == 0){
                clearInterval(timer);
                return;
            } 
            var speed = Math.ceil(distanceY/16);//speed这个值从高变低，那么scrollTop就减得从快到慢，上回到顶部的速度就先快后慢
            document.documentElement.scrollTop=distanceY-speed;
            // document.documentElement.scrollTop=distanceY-5;//如果给速度一个确定的值，那回到顶部的就匀速
        }, 16);
    }
}

// 页脚图片绑定点击事件
bodyImage.addEventListener('click', clickHandler);