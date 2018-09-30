# Using Vue Design System as an NPM Dependency on Nuxt project (BETA!)

### Testing things locally:

1. Switch to your vueds project and change `libraryTarget` setting in `config/index.js` to `commonjs2`.

2. Now build your design system for production by running `npm run build:system` inside the vueds project.

3. After done, switch to this project and run first `rm -rf node_modules` to make sure the temporary local installation won’t cause issues.

4. Now install the system locally by running `npm install --save file:/Users/viljamis/code/vue-design-system` (modify the path to match your own system).

5. Once you’ve installed the design system, run `npm install` to install the rest of the dependencies.

6. In your nuxt.js project, create a new file at `plugins/design-system.js`:

  ``` js
  import Vue from 'vue'
  import system from 'vue-design-system'
  import 'vue-design-system/dist/system.css'

  Vue.use(system)
  ```

7. Import this plugin in the nuxt.config.js file:

  ``` js
  plugins: [
    src: '~/plugins/designsystem'
  ]
  ```

8. Now you can run `npm run dev` to test that your design system build and its components work.

9. If everything works you should probably move your system to a private GitHub repository and do the NPM install directly from that repo.

## Things to keep in mind:

* Vue Design System can’t be currently imported to a project using [Vue 2.5.17+](https://github.com/vuejs/vue/releases/tag/v2.5.17-beta.0) due to some breaking changes they’ve introduced, so you need to use 2.5.16 or below for now. This will get hopefully fixed later on.

* This is a beta demo as VueDS is not fully compatible yet, it will throw a couple of errors, but everything should still more or less be testable.
