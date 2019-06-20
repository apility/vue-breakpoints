# vue-breakpoints

A Vue.js plugin providing a reactive object reflecting breakpoint states

## Install
```bash
yarn add @apility/vue-breakpoints
```

```javascript
import Vue from 'vue'
import VueBreakpoints from '@apility/vue-breakpoints'

// With default options
Vue.use(VueBreakpoints)

// With custom options
Vue.use(VueBreakpoints, {
  breakpoints: {
    ...
  },
  useRem: true
})
```

## Usage

```vue
...
<h1 v-if="bp.md">I'll show up on breakpoints md and above</h1>
<h1 v-else>I'll show up on breakpoints smaller than md</h1>

<h2 v-if="bp.breakpoint === 'md'">I'll only show up on the breakpoint md</h2>
...
```

## Options

### `breakpoints`

The breakpoints option is an object where the keys are breakpoint names, and the values are breakpoint min-width value

The default is:
```javascript
{
  xs: 0, sm: 36, md: 48, lg: 62, xl: 75
}
``` 

### `useRem`

The useRem option is a boolean value denoting whether the breakpoint values units are `rem` or `px`

The default is:
`true`
