const shareButton = document.querySelector("#shareButton");
const toast = document.querySelector("#toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
}

shareButton?.addEventListener("click", async () => {
  const shareData = {
    title: "Michael Olise | 法国与拜仁的左脚魔术师",
    text: "一页认识法国国脚、拜仁17号迈克尔·奥利塞。",
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    showToast("页面链接已复制，可以发给朋友了。");
  } catch {
    showToast("分享暂时没成功，可以直接复制浏览器地址。");
  }
});
