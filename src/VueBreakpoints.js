import Vue from 'vue'

export default class VueBreakpoints extends Vue {
  defaultOptions = {
    breakpoints: {
      xs: 0, sm: 36, md: 48, lg: 62, xl: 75,
    },

    useRem: true,
  }

  /** @type {Object} */
  options

  /** @type {Object[]} */
  breakpoints

  remSize = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('font-size'))

  static install (Vue, config) {
    const breakpoints = new VueBreakpoints(Vue, config)

    Object.defineProperty(Vue.prototype, '$breakpoints', {
      get: () => breakpoints,
    })
  }

  constructor (Vue, options = {}) {
    // @vue/component
    super({
      data: () => ({
        breakpoint: null,
      }),
    })

    this.vueInstance = Vue

    this.options = { ...this.defaultOptions, ...options }

    this.breakpoints = Object.entries(this.options.breakpoints)
      .sort(([, a], [, b]) => a - b)
      .map(([key, value]) => ({ name: key, value }))

    this.attachListener()

    this.updateBreakpoint()

    this.attachMixin()
  }

  /** @private */
  attachListener () {
    this.eventHandlerRunning = false
    window.addEventListener('resize', this.resizeEventListener.bind(this))
  }

  /** @private */
  resizeEventListener () {
    if (this.eventHandlerRunning) return

    this.eventHandlerRunning = true

    window.requestAnimationFrame(() => {
      this.updateBreakpoint()

      this.eventHandlerRunning = false
    })
  }

  /** @private */
  updateBreakpoint () {
    let width = window.innerWidth
    if (this.options.useRem) {
      width /= this.remSize
    }

    this.breakpoint = this.breakpoints
      .reduce((lowestFittingBreakpoint, breakpoint) => {
        return width >= breakpoint.value
          ? breakpoint
          : lowestFittingBreakpoint
      })
  }

  /** @private */
  attachMixin () {
    this.vueInstance.mixin({
      computed: {
        bp: () => ({
          breakpoint: this.breakpoint.name,

          ...this.breakpoints
            .map((bp) => ({
              ...bp,
              active: bp.value <= this.breakpoint.value,
            }))
            .reduce((breakpoints, breakpoint) => ({
              ...breakpoints,
              [breakpoint.name]: breakpoint.active,
            }), {}),
        }),
      },
    })
  }
}
