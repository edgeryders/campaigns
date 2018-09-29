# Install vue-design-system into nuxt.js

- Clone [https://github.com/viljamis/vue-design-system](https://github.com/viljamis/vue-design-system)

- change the package name in the ``` package.json ``` file

- Install dependencies with ``` rm -rf node_modules && npm install ```

- Create your design elements, patterns and templates

- Compile the production design system with ``` npm run build:system ```

- install your created design system into your nuxt.js project with ``` npm install --save file:[path-to-your-design-system] ```

- in your nuxt.js project, create a new file at: ``` plugins/design-system.js ```

``` js
import Vue from 'vue'
import system from 'vue-design-system'
import 'vue-design-system/dist/system.css'

Vue.use(system)
```
- Import this plugin in the nuxt.config.js file:

``` js
plugins: [
  src: '~/plugins/designsystem'
]
```

Now you can use your design system within your nuxt project
