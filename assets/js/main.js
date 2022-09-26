!(function () {
  const loadScript = (src) => new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })

  // Copiar código

  const copyButtons = (blocks, clipboard) => {
    blocks.forEach(function (codeBlock) {
      var button = document.createElement('button');
      button.className = 'code-copy';
      button.type = 'button';
      button.setAttribute('data-tts','up-right');
      button.setAttribute('aria-label', '{{ i18n "copy"}}');
      button.innerHTML = '<svg class="i i-copy" viewBox="0 0 24 24"><use href="/svg-sprite.svg#copy"></use></svg>';
      button.addEventListener('click', function () {
        clipboard.writeText(codeBlock.textContent).then(function () {
          button.blur();
          button.setAttribute('aria-label', '{{ i18n "copied"}}');
          setTimeout(function () {
            button.setAttribute('aria-label', '{{ i18n "copy"}}');
          }, 2000);
        });
      });
      var pre = codeBlock.parentNode;
      if (pre.parentNode.classList.contains('highlight')) {
        pre.parentNode.insertBefore(button, pre);
      }
    });
  }

  const CODE_BLOCKS = document.querySelectorAll('pre > code');

  if (CODE_BLOCKS) {
    if (navigator && navigator.clipboard) {
      copyButtons(CODE_BLOCKS, navigator.clipboard)
    } else {
      loadScript('https://cdn.jsdelivr.net/npm/clipboard-polyfill@3/dist/main/clipboard-polyfill.min.js')
        .then(() => {
          copyButtons(CODE_BLOCKS, clipboard)
        })
        .catch(console.error)
    }
  }

  let userPreference = localStorage.getItem('theme') || "system";

  function saveUserPreference(userPreference) {
    localStorage.setItem('theme', userPreference);
  }

  function getAppliedMode(userPreference) {
    if (userPreference === 'light') {
      return 'light';
    }
    if (userPreference === 'dark') {
      return 'dark';
    }

    // system
    if (matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function setAppliedMode(mode) {
    document.documentElement.className = mode;
    document.querySelector('meta[name="color-scheme"]').content = mode;
  }

  function setIconMode(userPreference) {
    if(getAppliedMode(userPreference) == "light") {
      THEME_TOGGLE.innerHTML = '<svg class="i i-sun" viewBox="0 0 24 24"><use href="/svg-sprite.svg#sun"></use></svg>';
    } else if (getAppliedMode(userPreference) == "dark") {
      THEME_TOGGLE.innerHTML = '<svg class="i i-moon" viewBox="0 0 24 24"><use href="/svg-sprite.svg#moon"></use></svg>';
    }
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (events) => {
    if (userPreference === "system") {
      if (events.matches) {
        setAppliedMode("dark");
        setIconMode("dark")
      } else {
        setAppliedMode("light");
        setIconMode("light")
      }
    }
  });

  const THEME_TOGGLE = document.querySelector(".theme-toggle");

  const THEME_HANDLE = document.querySelectorAll(".theme-handle > *");

  if (THEME_HANDLE) {
    setAppliedMode(getAppliedMode(userPreference));
    setIconMode(userPreference)

    THEME_HANDLE.forEach(function (handle) {
      if(userPreference == handle.dataset.theme) {
        handle.classList.add("is-active");
      } else {
        handle.classList.remove("is-active");
      }
      handle.onclick = () => {
        let newUserPref = handle.dataset.theme;
        userPreference = newUserPref;
        saveUserPreference(newUserPref);
        setAppliedMode(getAppliedMode(newUserPref));
        setIconMode(userPreference)

        if(userPreference == handle.dataset.theme) {
          THEME_HANDLE.forEach(el => el.classList.remove('is-active'));
          handle.classList.add("is-active");
        } else {
          handle.classList.remove("is-active");
        }
      }
    });
  }

  const TOC = document.querySelector(".toc");
  const TOC_TOGGLE = document.querySelector(".toc-toggle");

  if (TOC_TOGGLE && TOC){
    TOC_TOGGLE.onclick = () => {
      TOC.classList.add("is-active")
    };
  }


  // Todos los botones que requieren un clic "fuera" están aquí (help)

  const outsideClick = (button, target) => {
    if (!button || !target){
      return
    }

    function outside(event) {
      if (!target.contains(event.target) && !button.contains(event.target)) {
        target.classList.remove("is-active");
        document.removeEventListener('click', outside)
      }
    };

    button.onclick = function () {
      target.classList.toggle("is-active");
      document.addEventListener('click', outside)
    };

  }

  const toggle = document.getElementById("toggle-menu");
  const sidebar = document.getElementById("docs-sidebar");

  outsideClick(toggle,sidebar)

  
  const modeToggle = document.getElementById("toggle-mode");
  const modeDropdown = document.getElementById("docs-mode");

  outsideClick(modeToggle, modeDropdown)
  
  
  const langToggle = document.getElementById("toggle-lang");
  const langDropdown = document.getElementById("docs-language");

  outsideClick(langToggle, langDropdown)
  
  const versionToggle = document.getElementById("toggle-version");
  const versionDropdown = document.getElementById("docs-versions");

  outsideClick(versionToggle, versionDropdown)

  document.body.classList.remove("preload")
})(this);