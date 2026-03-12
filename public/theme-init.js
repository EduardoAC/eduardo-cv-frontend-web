(function () {
  var root = document.documentElement;
  var storageKey = root.getAttribute('data-theme-storage-key') || 'eduardoac-theme-preference';
  var themeAttribute = root.getAttribute('data-theme-attribute') || 'data-theme';
  var darkThemeColor = root.getAttribute('data-theme-color-dark') || '#303030';
  var lightThemeColor = root.getAttribute('data-theme-color-light') || '#f3f5f7';
  var storedPreference = null;

  try {
    storedPreference = window.localStorage.getItem(storageKey);
  } catch (error) {
    return;
  }

  if (storedPreference === 'system') {
    try {
      window.localStorage.removeItem(storageKey);
    } catch (error) {
      return;
    }

    return;
  }

  if (storedPreference !== 'dark' && storedPreference !== 'light') {
    return;
  }

  root.setAttribute(themeAttribute, storedPreference);
  root.classList.toggle('dark-theme', storedPreference === 'dark');
  root.classList.toggle('light-theme', storedPreference === 'light');
  root.style.colorScheme = storedPreference;

  var existingMeta = document.head.querySelector('meta[name="theme-color"][data-explicit-theme-color]');
  var meta = existingMeta || document.createElement('meta');
  meta.setAttribute('name', 'theme-color');
  meta.setAttribute('content', storedPreference === 'dark' ? darkThemeColor : lightThemeColor);
  meta.setAttribute('data-explicit-theme-color', 'true');

  if (!existingMeta) {
    document.head.appendChild(meta);
  }
})();
