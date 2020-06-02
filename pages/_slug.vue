<template>
  <div v-if="items.picture" class="body">
    <topbar class="navbar">
      <div
        class="bgimage"
      >
        <img :src="items.picture[0].url" />
      </div>
      <nuxt-link to="/"
        >
        <div class="logo">
      </div>
        <h1>Campaigns</h1></nuxt-link
      >
    </topbar>
    <div
      class="hero"
      :style="{ backgroundImage: 'url(' + items.picture[0].url + ')' }"
    >
    <div v-if="items.Ends" class="countdown">

    <VueCountdown :time="Date.parse(items.Ends)/1000">
      
  <template slot-scope="props">
    <div class="timer">
       <h3>Ends in</h3> <div class="time"><span>{{ props.days }} days</span> <span>{{ props.hours }} hours</span> <span>{{ props.minutes }} minutes</span> <span>{{ props.seconds }} seconds</span></div>
</div>
     </template>
    

</VueCountdown>
    </div>
      <div class="social">
                <div class="copied" :class="{ active : copied }">copied!</div>
                <div class="link" @click="vuecopydemo">
                  <textarea readonly rows='1' oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' ref="text">/{{slug}}</textarea>
                </div>
        <a class="twitter" :href="socialLink('twitter')" target="_blank"></a>
        <a class="facebook" :href="socialLink('facebook')" target="_blank"></a>
        <a class="linkedin" :href="socialLink('linkedin')" target="_blank"></a>
        <a class="email" :href="socialLink('email')" target="_blank"></a>
      </div>
    </div>

    <Wrapper style="padding: 44px 220px">
      <div class="campaign_title">
      <h1>{{ items.Name }}</h1>      <p class="campaign_date">{{ items.Created | formatDate }}</p>
    </div>

      <div class="organisers" v-if="items.Organisers">
        <h3>Organisers</h3>
        <a
          v-for="organiser in items.Organisers.split(',')"
          class="organiser"
          :href="'https://edgeryders.eu/u/' + organiser.substring(1)"
          target="_blank"
          >{{ organiser }}</a
        >
      </div>
      <div class="post_content">
        <h3>Introduction</h3>
        <div>{{ items.Introduction }}</div>
        <h3>The Problem</h3>
        <div>{{ items.Problem }}</div>
        <h3>The Solution</h3>
        <div>{{ items.Solution }}</div>
        <h4>What you can do to help</h4>
        <div v-html="items['Call to Action']"></div>
      </div>
    </Wrapper>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import topbar from "./../components/topnav.vue";
import VueCountdown from '@chenfengyuan/vue-countdown';
export default {
  name: "Index",
  release: "1.0.0",
  metaInfo: {
    title: "Edgeryders Campaigns",
    htmlAttrs: {
      lang: "en"
    }
  },
  components: {
    topbar,
    VueCountdown
  },
  asyncData({ params }) {
    return {
      slug: params.slug
    };
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("MMMM Do YYYY");
    }
  },
  data() {
    return {
      items: [],
      campaign: [],
      copied: false
    };
  },
  props: {
    type: {
      type: String,
      default: "div"
    }
  },
  mounted: function() {
    this.loadItems();
  },
  created() {
    if (process.browser) { 
        window.addEventListener("scroll", this.handleSCroll)
    }
  },
  methods: {
    socialLink(network, text) {
      var title = this.items.Name;
      var link = location.href;
      if (network == 'twitter') {
        return "https://twitter.com/intent/tweet?text=" + title + " - " + link
      }
      if (network == 'facebook') {
        return "https://www.facebook.com/sharer/sharer.php?u=" + link
      }
      if (network == 'linkedin') {
        return "https://www.linkedin.com/sharing/share-offsite/?url=" + link
      }
      if (network == 'email') {
        return "mailto:?subject=" + title + "&body=" + this.items.Introduction + ' ' + link
      }
    },
    handleSCroll(event) {
      let nav = document.querySelector(".navbar")
      let social = document.querySelector(".social")
      if (window.scrollY > 330) {
        nav.classList.add("active");
        social.classList.add("active");
      } else {
        nav.className = "navbar topnav";
         social.className = "social"
      }
    },
    vuecopydemo() {
      this.$refs.text.select();
      const link = location.href

       var el = document.createElement('textarea');
   el.value = link;
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   el.select();
   document.execCommand('copy');
   document.body.removeChild(el);

      this.copied = true;
      setTimeout(() => this.copied=false, 2000);

    },
    loadItems: function() {
      var self = this;
      var app_id = "app5ooowAE4HLT8Rg";
      var app_key = "keyocggSHfh6E9gSg";
      this.items = [];
      axios
        .get("https://api.airtable.com/v0/" + app_id + "/Campaigns", {
          headers: { Authorization: "Bearer " + app_key }
        })
        .then(function(response) {
          const records = response.data.records;

          function customFilter(object, key, value) {
            var objectIsFound = false;
            //if we found the desired object here we return true
            if (object.hasOwnProperty(key) && object[key].includes(value))
              return true;
            //else we keep looking and if we found de desired combination we stop
            for (var i = 0; i < Object.keys(object).length; i++) {
              if (typeof object[Object.keys(object)[i]] == "object") {
                objectIsFound = customFilter(
                  object[Object.keys(object)[i]],
                  key,
                  value
                );
                if (objectIsFound) break;
              }
            }
            return objectIsFound;
          }

          function imagesFilter(images, key, value) {
            //the .filter() will return an array of containing every object that returns true
            return images.filter(function(image) {
              return customFilter(image, key, value);
            });
          }

          var result = imagesFilter(records, "slug", self.slug);
          self.items = result[0].fields;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
@import "~ER-design-system/dist/system/tokens/tokens.scss";
@import "~ER-design-system/dist/system/system.utils.scss";

</style>

<style lang="sass" scoped>

.countdown
  position: absolute
  bottom: 10%
  left: 30px
  height: 40px
  color: white
  display: flex
  h3
    background: black
    color: white
    padding: 14px
    font-size: 18px
    float: left
    margin: 0
    width: auto !important
    display: inline-block
  .time
    float: left
    span
      border-right: 1px solid white
      display: block
      float: left
      background: white
      color: black
      font-size: 15px
      margin: 0 1px 0 0
      padding: 15px 12px 14px
      &:first-child
        font-weight: bold
      &:last-child
        border: none


@keyframes slideup
  0%
    transform: translateY(45px)
    opacity: 0
  30%
    transform: translateY(0px)
    opacity: 1
  60%
    transform: translateY(0px)
    opacity: 1
  100%
    opacity: 0
    transform: translateY(0px)

@keyframes slidedown
  0%
    transform: translateY(45px)
  30%
    transform: translateY(90px)
    opacity: 1
  60%
    transform: translateY(90px)
    opacity: 1
  100%
    opacity: 0
    transform: translateY(90px)

.navbar.active
  overflow: hidden
  box-shadow: 0 3px 5px rgba(0,0,0,0.2)
  .bgimage
    width: 100%
    overflow: hidden
    background: #000
    img
      filter: blur(10px)
 


.copied
  width: 60px !important
  padding: 0px 2px 0 3px !important
  opacity: 0
  position: absolute
  display: flex
  align-items: center
  font-size: 13px
  font-weight: bold
  top: 4px
  left: 5px
  background: #fff
  transform: translateY(0px) !important
  transition: transform .7s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important
  &.active
    transform: translateX(-70px) !important
    padding: 0px 2px 0 13px !important
.post_content
  div
    width: 70%
    margin: 20px 0
    position: relative
  h3
    &:before
      content: ''
      background: rgba(0,0,0,0.2)
      width: 10px
      height: 10px
      border-radius: 10px
      position: absolute
      left: 30px
      top: 20px
.organisers
  width: 100%
  clear: both
  display: inline-block
  a.organiser
    border: 1px solid rgba(0,0,0,0.1)
    border-radius: 4px
    padding: 8px 10px 5px !important
    margin: 0 10px 0 0 !important
    float: left
    display: inline-block
    position: relative
    text-decoration: none
    color: black !important
    transition: all .2s ease
    &:hover
      border: 1px solid orangered
      color: orangered !important
.topnav
  margin: 0 !important
  display: flex
  justify-content: left
  align-items: center
  padding: 0 !important
  overflow: hidden
  position: fixed
  top: 0
  z-index: 99999
  transition: none
  .bgimage
    height: 90px
    width: 100%
    overflow: hidden
    display: block
    position: fixed
    top: 0
    left: 0
    z-index: 1
    img
      width: 140%
      transition: all 1s ease
  a
    display: flex
    justify-content: left
    align-items: center
    text-decoration: none
    z-index: 99
    position: relative
  h1
    color: white !important
    margin: 0px !important
    padding: 0px !important
    float: left
  .logo
    float: left
    margin: 0px 16px 0 24px
.hero
  height: 450px !important
  background-size: 140% !important
  background-repeat: no-repeat
  background-position: 0 0px
  position: relative
  background-attachment: fixed
  .social
    width: auto
    padding: 4px 1px 3px 5px
    display: flex
    position: absolute
    bottom: 20px
    right: 30px
    a
      width: 35px
      height: 35px
      margin-right: 5px
      background-repeat: no-repeat !important
      background-position: center center !important
      background-size: 12px !important
      &.linkedin
        &:hover
          background-color: #0073B0
      &.facebook
        &:hover
          background-color: #4267B2
      &.twitter
        &:hover
          background-color: #1DA1F2
      &.email
        background-position: center 14px !important
        &:hover
          background-color: #2EA48A
    &.active
      position: fixed
      top: 24px
      background: #fff
      height: 37px
      right: 30px
      .copied
        padding: 4px 0px 4px 12px !important
        top: 0
        opacity: 0
        transition: transform .6s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s ease 1s !important
        &.active
          opacity: 1

          
    .link
      float: left
      padding: 0 !important
      margin: 0 10px 0 0 !important
      position: relative
      width: auto
      max-width: 100%
      display: flex
      &:hover
        cursor: pointer
      &:before
        width: 37px
        height: 36px
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1' viewBox='0 0 100 125'%3E%3Cpath fill='%23fff' d='M5 70l25-24 8 8 16-16 8 8 17-16-9-9-16 17-8-8L70 5l25 25-25 24-8-8-16 16 8 8-24 25L5 70zm33-16L21 70l9 9 16-17-8-8z'/%3E%3C/svg%3E") #000
        content: ''
        background-repeat: no-repeat
        background-position: center 11px
        background-size: 15px
        position: absolute
        left: 0
        top: 0px
      textarea
        max-width: 100%
        margin: 0 !important
        padding: 9px 0px 0 50px
        font-size: 13px
        border: 1px solid black
        resize: none
        overflow-x: scroll
        display: flex
        align-content: center
        justify-content: center
        &:focus
          outline: none !important
          border: 1px solid rgba(0,0,0,0.3)
    div
      transform: none
      opacity: 1
      width: 36px
      height: 36px
      background-size: 15px !important
      margin: 0 5px 0 0
      float: left
  h1
    color: white
    padding: 20px
    background: #000
    display: inline-block
    position: absolute
    bottom: 20px
    left: 20px



body
  padding: 0 !important
  margin: 0 !important

.campaign_title
  display: flex
  align-items: center
.campaign_date
  float: left
  background: rgba(0,0,0,0.0)
  border-left: 1px solid rgba(0,0,0,0.1)
  padding: 10px 15px
  margin-left: 20px
  font-size: 18px

h1
  display: flex
  .logo
    width: 54px !important
    height: 54px !important
    margin: 4.3px 15px 0 4px
.grid
  width: 100%
  columns: 2
  page-break-inside: avoid
  column-gap: 30px
  padding-top: 0 !important

.social
      position: absolute
      right: 30px
      bottom: 20px
      a
        width: 33px
        height: 33px
        background-position: center 54% !important
        background-repeat: no-repeat !important
        background-size: 12px, 100% !important
        &.twitter
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1' viewBox='0 0 512 512'%3E%3Cpath fill='%23fff' d='M445 161V95h-33V61h-34V28H256v33h-33v34h-34v66h-44v-33h-45V95H67V61H0v189h33v34h34v33h67v34h-34v33H67v33H33v67h312v-33h33v-34h34v-33h33V262h34v-34h33v-67z'/%3E%3C/svg%3E") #000
        &.facebook
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1' viewBox='0 0 512 512'%3E%3Cpath fill='%23fff' d='M412 122V0H234v33h-34v34h-33v100h-67v122h67v223h134V289h66V167h-66v-45z'/%3E%3C/svg%3E") #000
          transition-delay: .1s
        &.linkedin
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1' viewBox='0 0 512 512'%3E%3Cpath fill='%23fff' d='M11 167h111v345H11zM100 33V0H33v33H0v67h33v34h67v-34h34V33zM479 234v-34h-34v-33H289v33h-33v-33H156v345h111V301h34v-34h66v34h34v211h111V234z'/%3E%3C/svg%3E") #000
          transition-delay: .15s
        &.email
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1' viewBox='0 0 512 512'%3E%3Cpath fill='%23fff' d='M0 72v67h33v34h34v33h33v33h111v-33h67v-33h67v33h-67v33h-67v34h-77v167h77v-34h34v-33h33v-34h34v-33h33v-33h33v-34h34v-33h33v-33h34v-34h33V72z'/%3E%3C/svg%3E") #000
          transition-delay: .3s
.box
  width: 100% !important
  box-shadow: 0 3px 0px rgba(0,0,0,0.08)
  background: rgba(0,0,0,0.02)
  display: inline-block
  margin: 0 0 30px 0
  overflow: hidden
  -webkit-column-break-inside: avoid
  page-break-inside: avoid
  break-inside: avoid
  .arrow
    width: 44px
    float: left
    height: 67px
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 78 97.5'%3E%3Cpath fill='%23fff' d='M60 36v-6h-6v6H12v6h42v6h6v-6h6v-6h-6zM48 24v6h6v-6h-6zM42 18v6h6v-6h-6zM36 12v6h6v-6h-6zM48 54h6v-6h-6v6zM42 60h6v-6h-6v6zM36 66h6v-6h-6v6z'/%3E%3C/svg%3E") #000
    background-position: center 60%
    background-repeat: no-repeat
    background-size: 25px, 100%
    margin: 20px 0
    transform: translateX(-40px)
    position: relative
    z-index: 0
    transition: all .7s ease
  img
    width: 100% !important
  .thumb
    height: 200px
    width: 100%
    position: relative
    background-size: cover
    background-position: 50%
    background-color: #21D4FD
    background-color: #FAD961
    background-image: linear-gradient(90deg, #FAD961 0%, #F76B1C 100%)
    h1
      padding: 8px 14px
      margin: 20px 0 20px 20px
      float: left
      background: white
      color: black
      display: inline-block
      position: relative
      z-index: 1
    .social
      position: absolute
      right: 30px
      bottom: 20px
      a.social_link
        width: 33px
        height: 33px
        background-position: center 54% !important
        background-repeat: no-repeat !important
        background-size: 12px, 100% !important
        transform: translateX(100px)
        transition: all .7s ease
        margin: 0 0 .5px 0
        opacity: 0
        &.twitter
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1' viewBox='0 0 512 512'%3E%3Cpath fill='%23fff' d='M445 161V95h-33V61h-34V28H256v33h-33v34h-34v66h-44v-33h-45V95H67V61H0v189h33v34h34v33h67v34h-34v33H67v33H33v67h312v-33h33v-34h34v-33h33V262h34v-34h33v-67z'/%3E%3C/svg%3E") #000
        &.facebook
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1' viewBox='0 0 512 512'%3E%3Cpath fill='%23fff' d='M412 122V0H234v33h-34v34h-33v100h-67v122h67v223h134V289h66V167h-66v-45z'/%3E%3C/svg%3E") #000
          transition-delay: .1s
        &.linkedin
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1' viewBox='0 0 512 512'%3E%3Cpath fill='%23fff' d='M11 167h111v345H11zM100 33V0H33v33H0v67h33v34h67v-34h34V33zM479 234v-34h-34v-33H289v33h-33v-33H156v345h111V301h34v-34h66v34h34v211h111V234z'/%3E%3C/svg%3E") #000
          transition-delay: .15s
        &.email
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1' viewBox='0 0 512 512'%3E%3Cpath fill='%23fff' d='M0 72v67h33v34h34v33h33v33h111v-33h67v-33h67v33h-67v33h-67v34h-77v167h77v-34h34v-33h33v-34h34v-33h33v-33h33v-34h34v-33h33v-33h34v-34h33V72z'/%3E%3C/svg%3E") #000
          transition-delay: .3s
    &:hover
      .arrow
        transform: translateX(0px)
      .social
        div
          transform: translateX(0px)
          opacity: 1
  .exerpt
    padding: 5px 20px

@media (max-width: 900px)
  .wrapper
    padding: 0 30px !important
  .campaign_title
    display: inline-block
    width: 100%
    clear: both
    margin: 10px 0 20px !important
    h1
      margin: 14px 0 0 0 !important
      height: 30px !important
    .campaign_date
      padding: 10px !important
      border: 1px solid #ddd
      margin: 27px 0 0 0
  .hero
    height: 230px !important
  .post_content div
    width: 100% !important
  .countdown
    display: none
  .organisers
    a.organiser
      margin: 0 10px 10px 0 !important

.logo 
  width: 55px
  height: 90px
  display: inline-block
  margin-left: 20px
  background: url("data:image/svg+xml,%3Csvg height='500' width='500' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m0 250a250 250 0 1 1 500 0 250 250 0 0 1 -500 0zm97-103v106h42v-16h-26v-31h19v-16h-19v-27h26v-16zm80 91c6 0 8-4 8-11v-52c0-8-4-12-13-12h-4v75zm-25-91h23c19 0 27 10 27 29v48c0 20-8 29-26 29h-24zm63 25c0-17 9-27 25-27s24 9 24 27v10h-16v-11c0-8-3-11-8-11-6 0-9 3-9 11v59c0 7 3 11 9 11 5 0 8-4 8-11v-17h-10v-13h26v53h-8l-3-7c-4 7-9 10-16 10-14 0-22-11-22-30zm64-25h43v16h-26v27h18v16h-18v31h26v16h-43zm-167 234h-17v-106h24c18 0 26 8 26 30 0 13-3 21-10 26l12 50h-17l-10-45h-8zm0-60v-31h6c8 0 10 3 10 15 0 11-2 16-10 16zm53-46 10 42h1l10-42h17l-19 62v44h-16v-42l-20-64zm69 90c6 0 9-4 9-11v-51c0-9-4-13-13-13h-4v75zm-24-90h23c18 0 27 9 27 29v47c0 20-8 30-26 30h-24zm136 46v-31h6c8 0 10 3 10 15 0 11-2 16-10 16zm-72-46h43v15h-26v28h19v15h-19v32h26v16h-43zm72 106h-16v-106h24c17 0 25 8 25 30 0 13-3 21-10 26l12 50h-17l-10-45h-8zm57-30c1 11 4 16 11 16 6 0 10-4 10-10 0-9-6-14-15-23-12-12-20-21-20-35 0-15 11-26 25-26s24 10 25 26l-16 2c-1-9-3-13-9-13-5 0-9 4-9 10 0 9 7 16 17 25 11 11 18 19 18 34s-11 26-26 26-26-11-27-29zm-65-172v-42h-42a42 42 0 1 1 42 42z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E") no-repeat center center
  background-size: 100%

</style>
