# Using Vue Design System as an NPM Dependency on Nuxt project


## Testing from a remote repository

1. Clone this repository
2. Run `rm -rf node_modules && npm install`
3. Now you can run `npm run dev` to test that the design system build and its components work.
4. When you’re ready to start testing your own system library, switch the `vue-design-system` dependency in the package.json to point to your own private repository.


### Testing things locally:

1. Switch to your vueds project and change `libraryTarget` setting in `config/index.js` to `commonjs2`.
2. Now build your design system for production by running `npm run build:system` inside the vueds project.
3. After done, switch to this project and run first `rm -rf node_modules` to make sure the temporary local installation won’t cause issues.
4. Now install the system locally by running `npm install --save file:/Users/viljamis/code/vue-design-system` (modify the path to match your own system).
5. Once you’ve installed the design system, run `npm install` to install the rest of the dependencies.
6. In your nuxt.js project, create a new file at `plugins/design-system.js`:
  ``` js
  import Vue from 'vue'
  import DesignSystem from 'vue-design-system'
  import 'vue-design-system/dist/system/system.css'

  Vue.use(DesignSystem)
  ```
7. Import this plugin in the nuxt.config.js file (you can remove the `ssr: false` part if you build your library as a `commonjs2` module):
  ``` js
  plugins: [{
    src: '~/plugins/design-system', ssr: false
  }]
  ```
8. Now you can run `npm run dev` to test that your design system build and its components work (you will get a couple of errors for some reason when testing locally).
9. If everything more or less works you should move your system to a private GitHub repository and do the NPM install directly from that repo _(see the steps above)._
