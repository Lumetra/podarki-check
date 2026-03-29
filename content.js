// Автоматически отмечаем все чекбоксы при загрузке страницы
function checkAll() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => { cb.checked = true; });
}

function uncheckAll() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => { cb.checked = false; });
}

function addButtons() {
  if (document.getElementById('pw-ext-panel')) return;

  // Ищем ссылку "Переданные предметы" как якорную точку
  let anchor = null;
  const allLinks = document.querySelectorAll('a');
  for (const a of allLinks) {
    if (a.textContent.trim().includes('Переданные предметы')) {
      anchor = a;
      break;
    }
  }

  const panel = document.createElement('div');
  panel.id = 'pw-ext-panel';
  panel.style.cssText = `
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  `;

  // Стиль кнопок — под стиль сайта PW (бежево-коричневый, как у их кнопок)
  const btnStyle = `
    display: inline-block;
    padding: 4px 28px;
    font-size: 12px;
    font-family: Arial, sans-serif;
    cursor: pointer;
    border: 1px solid #a07840;
    border-radius: 3px;
    background: linear-gradient(to bottom, rgba(245,238,220,0.45), rgba(220,200,165,0.45));
    color: #8a7050;
    font-weight: normal;
    text-shadow: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4);
    border: 1px solid rgba(120,85,30,0.7);
    transition: filter 0.15s;
  `;

  const btnCheck = document.createElement('button');
  btnCheck.textContent = 'Отметить все';
  btnCheck.style.cssText = btnStyle;
  btnCheck.onmouseover = () => btnCheck.style.filter = 'brightness(1.1)';
  btnCheck.onmouseout = () => btnCheck.style.filter = '';
  btnCheck.onclick = () => { checkAll(); updateCount(); };

  const btnUncheck = document.createElement('button');
  btnUncheck.textContent = 'Снять все';
  btnUncheck.style.cssText = btnStyle;
  btnUncheck.onmouseover = () => btnUncheck.style.filter = 'brightness(1.1)';
  btnUncheck.onmouseout = () => btnUncheck.style.filter = '';
  btnUncheck.onclick = () => { uncheckAll(); updateCount(); };

  const updateCount = () => {};

  panel.appendChild(btnCheck);
  panel.appendChild(btnUncheck);

  // Вставляем после ссылки "Переданные предметы", или в конец body если не нашли
  if (anchor && anchor.parentNode) {
    anchor.parentNode.insertBefore(panel, anchor.nextSibling);
  } else {
    document.body.appendChild(panel);
  }

  updateCount();
}

// Запускаем
checkAll();
addButtons();
