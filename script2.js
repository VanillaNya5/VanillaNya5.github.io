

// 定义默认图片 URL
const defaultImageUrl = 'your-default-image-url.jpg';

// 用于存储每个图片的观察器
const imgObserverMap = new Map();

// 预加载图片并移除 loading 类
function preloadImage(imgElement) {
  const img = imgElement || document.createElement('img');
  img.src = img.src || defaultImageUrl;
  img.classList.add('loading');

  // 为图片添加唯一标识
  img.id = 'img_' + Math.random().toString(36).slice(2, 10); // 使用随机数确保唯一性

  img.addEventListener('load', function () {
    img.classList.remove('loading');
    // 移除 Efficiently 清除单个图片的观察器
    removeLoadingClassAndStopObserving(img);
  });



  // 使用图片的唯一标识初始化和存储观察器
  const observerOptions = { rootMargin: '0px' };
  const observer = new IntersectionObserver(({ isIntersecting, target }) => {
    if (target.matches('#' + img.id)) { // 只对当前图片的ID进行处理
      target.classList.remove('loading');
    }
    // 如果图片被卸载后，停止观察
    if (!img.id) { // 图片被卸载，移除errober
        observer.disconnect();
        imgObserverMap.delete(target);
    }
  }, observerOptions);

  imgObserverMap.set(img, observer);
  observer.observe(img);
}

// 页面加载完成时，遍历并预加载图片
document.addEventListener('DOMContentLoaded', function () {
  const imgElements = document.getElementsByTagName('img');
  for (let i = 0; i < imgElements.length; i++) {
    preloadImage(imgElements[i]);
  }
});

// 用于清除单个图片的观察器和移除loading类
function removeLoadingClassAndStopObserving(img) {
    img.classList.remove('loading');
    if (imgObserverMap.has(img)) {
      const observer = imgObserverMap.get(img);
      observer.disconnect();
      imgObserverMap.delete(img);
    }
  }

// 可能需要的通用停止观察器，暂停所有图片的观察
function stopObservingAll() {
  imgObserverMap.forEach((observer, img) => {
    observer.disconnect();
  });
  imgObserverMap.clear();
}


const dialogStack = [];
const BASE_Z_INDEX = 1000;

function createDialog(options) {
  return new Promise((resolve) => {
  // 计算层级
  const zIndex = BASE_Z_INDEX + dialogStack.length * 2;
                
  // 创建遮罩层
  const mask = document.createElement('div');
  mask.className = 'dialog-mask';
  mask.style.zIndex = zIndex;

  // 创建对话框主体
  const dialog = document.createElement('div');
  dialog.className = 'dialog-box';
  dialog.style.zIndex = zIndex + 1;

  // 标题
  if (options.title) {
    const title = document.createElement('h3');
    title.style.marginTop = '0';
    title.textContent = options.title;
    dialog.appendChild(title);
  }

  // 内容
  if (options.content) {
    const content = document.createElement('p');
    content.textContent = options.content;
    dialog.appendChild(content);
  }

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'dialog-buttons';

  let timers = [];

  options.buttons.forEach(btn => {
  const button = document.createElement('button');
  button.className = 'dialog-button';
  button.textContent = btn.text;
  button.style.backgroundColor = btn.color || '#f0f0f0';

  // 倒计时逻辑
  if (typeof btn.delay === 'number' && btn.delay > 0) {
    button.disabled = true;
    const originalText = btn.text;
    let countdown = btn.delay;

    const update = () => {
      button.textContent = `${originalText} (${countdown}s)`;
      if (countdown <= 0) {
        clearInterval(timer);
        button.disabled = false;
        button.textContent = originalText;
        return;
      }
      countdown--;
    };

    const timer = setInterval(update, 1000);
    timers.push(timer);
    update();
  }

  // 按钮点击事件
  button.onclick = () => {
    cleanup();
    resolve(btn.value);
  };

  buttonContainer.appendChild(button);
  });

  dialog.appendChild(buttonContainer);
  mask.appendChild(dialog);
  document.body.appendChild(mask);
  dialogStack.push({ mask, timers });

  // 背景点击事件
  mask.onclick = (e) => {
  if (e.target === mask && options.backgroundClose !== false) {
    cleanup();
    resolve(options.backgroundValue || 'background');
  }
  };

  // 清理函数
  const cleanup = () => {
    timers.forEach(clearInterval);
    mask.remove();
    const index = dialogStack.findIndex(d => d.mask === mask);
    if (index > -1) dialogStack.splice(index, 1);
  };
  });
}