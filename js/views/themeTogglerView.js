import View from './View'

class ThemeTogglerView extends View {
  _parentElement = document.querySelector('#theme')

  addHandlerRenderTheme(handler) {
    window.addEventListener('load', handler)
  }

  addHandlerToggleTheme(handler) {
    this._parentElement.addEventListener('click', handler)
  }

  addHandlerChangeThemePreference(handler) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      e.matches ? handler.call(this, 'dark') : handler.call(this, 'light')
    })
  }

  render(theme) {
    super.render(theme)
    this._toggleThemeClass(theme)
  }

  _toggleThemeClass(theme) {
    theme === 'light'
      ? document.documentElement.classList.remove('dark')
      : document.documentElement.classList.add('dark')
  }

  _generateMarkup() {
    // prettier-ignore
    return this._data === 'light'
      ? `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 stroke-dark-blue-text dark:stroke-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            Light Mode
        `
      : `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 stroke-dark-blue-text dark:stroke-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
            Dark Mode
        `
  }
}

export default new ThemeTogglerView()
