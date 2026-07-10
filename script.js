const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const spotlight = {
  club: {
    title: "拜仁慕尼黑的 17 号",
    text: "2024 年夏天从水晶宫加盟拜仁，合同至 2029 年。对朋友来说，记住一点就够了：他是拜仁右路非常有创造力的左脚攻击手。",
  },
  role: {
    title: "右路出发，但不只在边路",
    text: "他可以贴边拉开宽度，也会进入肋部组织。好看的地方在于，他不是一直冲，而是会等对手先露出重心。",
  },
  foot: {
    title: "左脚是开锁工具",
    text: "内切、斜塞、传中、定位球，很多危险都从他的左脚开始。防守球员知道这一点，但封住并不容易。",
  },
};

const zones = {
  right: {
    label: "右路接球",
    title: "先把防线拉宽",
    text: "奥利塞常从右路拿球，让边后卫必须贴近他。只要对手重心一歪，他就有空间用左脚选择传中、内切或斜塞。",
    route: "a",
    meters: [86, 78, 70],
  },
  inside: {
    label: "内切肋部",
    title: "把慢节奏变成突然加速",
    text: "他最迷人的地方，是看起来像在等，其实是在观察。一个小触球之后，传球线和射门角度会同时打开。",
    route: "b",
    meters: [92, 84, 82],
  },
  final: {
    label: "最后一传",
    title: "轻轻一脚，线路很狠",
    text: "奥利塞的最后一传经常不夸张，但质量很高。球从防线身后滑进去时，你会发现他早就看到了跑位。",
    route: "c",
    meters: [80, 94, 74],
  },
};

const modes = {
  friend: {
    tag: "给朋友一句话",
    title: "他是那种越看越上头的左脚球员",
    text: "不一定每次都用夸张动作吸引镜头，但他拿球时会让你期待下一秒：会不会突然内切？会不会送出一脚很轻但很狠的传球？",
  },
  tactic: {
    tag: "战术观察",
    title: "他让右路不只是边路",
    text: "他能在宽度和肋部之间切换，把防守横向拉开。队友跑位一启动，他的左脚就能把球送到防线身后。",
  },
  vibe: {
    tag: "气质关键词",
    title: "冷静、克制，但很危险",
    text: "他没有那种一直外放的明星感，反而像一台安静运转的创造机器。越是这种安静，关键处理越显得利落。",
  },
};

const eras = {
  reading: {
    year: "2019-2021",
    title: "在雷丁进入职业足球",
    text: "青训履历很丰富，但真正让他进入成年比赛节奏的是雷丁。他在那里把天赋变成了稳定上场的能力。",
  },
  palace: {
    year: "2021-2024",
    title: "在水晶宫被更多人看见",
    text: "英超的强度让他的技术更有说服力。右路持球、定位球、最后一传，都开始变成他的招牌。",
  },
  bayern: {
    year: "2024 至今",
    title: "拜仁给了他更大的舞台",
    text: "加盟拜仁后，他进入更高节奏的争冠环境。对球迷来说，这也是他从潜力股变成焦点球员的阶段。",
  },
  france: {
    year: "法国队",
    title: "从青年队到成年国家队",
    text: "他代表法国参加青年级别赛事，并在 2024 年进入法国成年国家队视野。法国前场因此多了一种细腻的左脚选择。",
  },
};

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function updateScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? window.scrollY / max : 0;
  document.documentElement.style.setProperty("--scroll", value.toFixed(4));
}

function glideTo(targetId) {
  document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

$$("[data-spotlight]").forEach((button) => {
  button.addEventListener("click", () => {
    const item = spotlight[button.dataset.spotlight];
    setText("#spotlightTitle", item.title);
    setText("#spotlightText", item.text);
  });
});

$$("[data-zone]").forEach((button) => {
  button.addEventListener("click", () => {
    const zone = zones[button.dataset.zone];
    $$(".pitch-point").forEach((point) => point.classList.toggle("is-active", point === button));
    $$(".route").forEach((route) => route.classList.remove("is-active"));
    $(`.route-${zone.route}`)?.classList.add("is-active");
    setText("#zoneLabel", zone.label);
    setText("#zoneTitle", zone.title);
    setText("#zoneText", zone.text);
    ["#meterTempo", "#meterPass", "#meterShot"].forEach((id, index) => {
      $(id).value = zone.meters[index];
    });
  });

  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });
});

$$("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".mode-tabs button").forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    const mode = modes[button.dataset.mode];
    setText("#modeTag", mode.tag);
    setText("#modeTitle", mode.title);
    setText("#modeText", mode.text);
  });
});

$$("[data-era]").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".timeline button").forEach((item) => item.classList.toggle("is-active", item === button));
    const era = eras[button.dataset.era];
    setText("#eraYear", era.year);
    setText("#eraTitle", era.title);
    setText("#eraText", era.text);
  });
});

$$(".flip-card").forEach((card) => {
  card.addEventListener("click", () => card.classList.toggle("is-open"));
});

$$("[data-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    glideTo(button.dataset.jump);
  });
});


function closeMenus(except) {
  $$(".nav-group").forEach((group) => {
    if (group === except) return;
    group.classList.remove("is-open");
    group.querySelector(".nav-trigger")?.setAttribute("aria-expanded", "false");
  });
}

$$(".nav-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const group = trigger.closest(".nav-group");
    const isOpen = group.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", String(isOpen));
    closeMenus(isOpen ? group : undefined);
  });
});

$$(".nav-menu a").forEach((link) => link.addEventListener("click", () => closeMenus()));
document.addEventListener("click", (event) => {
  if (!event.target.closest(".mega-nav")) closeMenus();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenus();
});

$("#shareButton")?.addEventListener("click", async () => {
  const shareData = {
    title: "Michael Olise 互动档案",
    text: "一个可以点着玩的奥利塞球员介绍页。",
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    showToast("链接已复制，可以发给朋友了。");
  } catch {
    showToast("分享没成功，可以直接复制浏览器地址。");
  }
});

$("[data-share-menu]")?.addEventListener("click", () => $("#shareButton")?.click());

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();
