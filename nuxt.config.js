require('dotenv').config();

module.exports = {
  plugins: [{
    src: '~/plugins/design-system', ssr: true
  }],
  css: [
    '@/assets/global.scss'
]
}
