const itemsData = [
    { name: "M4A1-S | Вейпорейв", img: "img/skins/m4a1-s_вейпорейв_red.png", rarity: "red" },
    { name: "M4A4 | Император", img: "img/skins/m4a4_император_red.png", rarity: "red" },
    { name: "M4A4 | Король Драконов", img: "img/skins/m4a4_корольдраконов_фиолет.png", rarity: "purple" },
    { name: "M4A4 | Турбина", img: "img/skins/m4a4_турбина_viol.png", rarity: "purple" },
    { name: "M249 | Гипнотизёр", img: "img/skins/m249_гипонотизёр_blue.png", rarity: "blue" },
    { name: "MAC-10 | Сайби Они", img: "img/skins/mac-10_сайби_они_blue.png", rarity: "blue" },
    { name: "P90 | Рэнди Раш", img: "img/skins/p90_рэнди_раш_резвый_viol.png", rarity: "purple" },
    { name: "AK-47 | Дилетанты", img: "img/skins/ак-47_дилетанты_фиолет.png", rarity: "purple" },
    { name: "Dual Berettas | Гидроудар", img: "img/skins/двойныйбереты_гидроудар_viol.png", rarity: "purple" },
    { name: "Кукри | Багровая сеть", img: "img/skins/кукри_багровая сеть_gold.png", rarity: "gold" },
  ];
  
  const itemsContainer = document.getElementById("items");
  const spinBtn = document.getElementById("spin");
  const resultText = document.getElementById("result");
  
  const flash = document.createElement("div");
  flash.classList.add("flash");
  document.body.appendChild(flash);
  
  /* === Цвет редкости (градиенты) === */
  function getRarityColor(rarity) {
    switch (rarity) {
      case "blue":
        return "linear-gradient(315deg, #0a1447 0%, #274bff 50%, #7ba9ff 100%)";
      case "purple":
        return "linear-gradient(315deg, #1d004d 0%, #7a2aff 50%, #d07bff 100%)";
      case "red":
        return "linear-gradient(315deg, #3a0000 0%, #b11a1a 50%, #ff6666 100%)";
      case "gold":
        return "linear-gradient(315deg, #2b2100 0%, #ffb400 50%, #fff6a0 100%)";
      default:
        return "linear-gradient(315deg, #111 0%, #444 100%)";
    }
  }
  
  /* === Эффекты === */
  function createSparks() {
    for (let i = 0; i < 20; i++) {
      const spark = document.createElement("div");
      spark.classList.add("spark");
      spark.style.left = "50%";
      spark.style.top = "50%";
      spark.style.setProperty("--tx", `${(Math.random() - 0.5) * 400}px`);
      spark.style.setProperty("--ty", `${(Math.random() - 0.5) * 400}px`);
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 1000);
    }
  }
  
  function triggerFlash() {
    flash.style.opacity = "1";
    setTimeout(() => (flash.style.opacity = "0"), 300);
  }
  
  /* === Создание ленты === */
  function renderItems() {
    itemsContainer.innerHTML = "";
    const repeatCount = 6;
    for (let i = 0; i < repeatCount; i++) {
      itemsData.forEach(item => {
        const el = document.createElement("div");
        el.classList.add("item");
        el.style.backgroundImage = getRarityColor(item.rarity);
        el.innerHTML = `
          <div class="item-content">
            <img src="${item.img}" alt="${item.name}">
            <span class="item-name">${item.name}</span>
          </div>
        `;
        itemsContainer.appendChild(el);
      });
    }
  }
  
  
// Подсвечиваем ровно тот скин, который реально находится под центром рамки
function updateActiveItem() {
    const wnd = document.querySelector('.case-window');
    if (!wnd) return;
  
    const wr = wnd.getBoundingClientRect();
    const centerX = wr.left + wr.width / 2;
    const centerY = wr.top + wr.height / 2;
  
    const cards = itemsContainer.querySelectorAll('.item');
    if (!cards.length) return;
  
    // ⚠️ Временно убираем pointer, чтобы не мешал определению
    const pointer = document.querySelector('.pointer');
    if (pointer) pointer.style.visibility = "hidden";
  
    const topEl = document.elementFromPoint(centerX, centerY);
    const activeItem = topEl ? topEl.closest('.item') : null;
  
    if (pointer) pointer.style.visibility = "visible";
  
    // Снимаем подсветку со всех, ставим только на один
    cards.forEach(c => c.classList.remove('active'));
    if (activeItem) activeItem.classList.add('active');
  }
  
  renderItems();
    updateActiveItem()
 
  // Постоянная проверка позиции
  let animRaf = null;
  function startWatch() {
    if (animRaf) cancelAnimationFrame(animRaf);
    const tick = () => {
      updateActiveItem();
      animRaf = requestAnimationFrame(tick);
    };
    tick();
  }
  function stopWatch() {
    if (animRaf) cancelAnimationFrame(animRaf);
    animRaf = null;
    updateActiveItem();
  }
  
  
  /* === Крутилка === */
  function spin() {
    spinBtn.disabled = true;
    resultText.textContent = "🎲 Крутится...";
  
    const totalItems = itemsContainer.children.length;
    const itemWidth = 160;
    const chosenItem = itemsData[Math.floor(Math.random() * itemsData.length)];
    const visibleCenter = itemsContainer.parentElement.offsetWidth / 2 - itemWidth / 2;
  
    const randomOffset = Math.floor(Math.random() * (totalItems / 2)) * itemWidth;
    const alignmentFix = -2;
    const stopPosition = -(randomOffset + itemWidth * itemsData.indexOf(chosenItem)) + visibleCenter + alignmentFix;
  
    itemsContainer.style.transition = "none";
    itemsContainer.style.transform = "translateX(0px)";
    void itemsContainer.offsetWidth;
  
    itemsContainer.style.transition = "transform 5s cubic-bezier(0.05, 0.5, 0.1, 1)";
    itemsContainer.style.transform = `translateX(${stopPosition}px)`;
  
    // Запускаем наблюдение
    startWatch();
    itemsContainer.addEventListener("transitionend", stopWatch, { once: true });
  
    setTimeout(() => {
      resultText.textContent = `🎯 Выпало: ${chosenItem.name}`;
      if (["red", "gold"].includes(chosenItem.rarity)) {
        triggerFlash();
        createSparks();
      }
      spinBtn.disabled = false;
    }, 5000);
  }
  
  spinBtn.addEventListener("click", spin);

  
// === Кнопка "Войти" (справа) ===
const loginBtnRight = document.getElementById("login-btn-right");
if (loginBtnRight) {
  loginBtnRight.addEventListener("click", () => {
    alert("🔐 Здесь появится форма входа (добавим позже)");
  });
}
