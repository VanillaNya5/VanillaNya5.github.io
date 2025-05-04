

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