<template>
  <Wrapper>
    <Wrapper style="padding-top: 0 !important; padding-bottom: 0 !important;">
      <div class="nav_bar">
    <h1 class="title">    
Campaigns
</h1>
</div>
    <div class="intro">
    <Paragraph>
      <span class='question_mark'></span><b>If you are new to Edgeryders</b>: we are a global network of 5000 people who are interested in participation, health, technology, social progress, innovation, and many more topics. We come from all walks of life to access interesting information, make new connections and collaborate. By sharing experiences with one another we turn our collective knowledge into useful advice to make better decisions for ourselves and our families in the near future.
    </Paragraph>
     <div class='get_involved'>
      <h1><nuxt-link to="/get-involved">Tell us what brings you here</a></nuxt-link></h1>
    </div>
  </div>
</Wrapper>
<Wrapper style="padding-top: 0 !important; padding-bottom: 0 !important;">
    <div class="grid">
    <div v-for="post in items" class="box">
          <div class="header" > 
<div class="thumb">
  <img :src="post.fields.picture && post.fields.picture[0].url" />

      <nuxt-link :to="'/' + post.fields.slug" class="permalink">
        <h1>{{post.fields.Name }}</h1>
        <div class="arrow"></div>
      </nuxt-link>

      <p class="date">{{ post.fields.Created | formatDate }}</p>
      <div class="social_shortcuts">
        <a class="twitter" :href="socialLink('twitter', post.fields.slug, post.fields.Name)" target="_blank"></a>
        <a class="facebook" :href="socialLink('facebook', post.fields.slug, post.fields.Name)" target="_blank"></a>
        <a class="linkedin" :href="socialLink('linkedin', post.fields.slug, post.fields.Name)" target="_blank"></a>
        <a class="email" :href="socialLink('email', post.fields.slug, post.fields.Name)" target="_blank"></a>
      </div>
</div>
          </div>

          


    <p class="exerpt">{{post.fields.Introduction }}</p>
              </div>

  </div>
  </Wrapper>
  </Wrapper>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "Index",
  release: "1.0.0",
  metaInfo: {
    title: "Edgeryders Campaigns",
    htmlAttrs: {
      lang: "en"
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format('MMMM Do YYYY') 
    }
  },
  data() {
    return {
      items: []
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
  computed: {
    geturl(value) {
      return value.fields.picture[0].url
    }
    
  },
  methods: {
    socialLink(network, link, text) {
      if (network == 'twitter') {
        return "https://twitter.com/intent/tweet?text=" + text + " - " + link
      }
      if (network == 'facebook') {
        return "https://www.facebook.com/sharer/sharer.php?u=" + link
      }
      if (network == 'linkedin') {
        return "https://www.linkedin.com/sharing/share-offsite/?url=" + link
      }
      if (network == 'email') {
        return "mailto:?subject=" + text + "&body=" + link
      }
    },
    prepareURL(string) {
        return string.fields.picture[0].url;
    },
    loadItems: function() {
      var self = this;
      var app_id = "app5ooowAE4HLT8Rg";
      var app_key = "keyocggSHfh6E9gSg";
      this.items = [];
      axios
        .get(
          "https://api.airtable.com/v0/" + app_id + "/Campaigns",
          {
            headers: { Authorization: "Bearer " + app_key }
          }
        )
        .then(function(response) {
          self.items = response.data.records;
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

<style lang="sass">


.social_shortcuts
  a
    width: 33px
    height: 33px
    background-position: center 54% !important
    background-repeat: no-repeat !important
    background-size: 12px, 100% !important
    transform: translateX(100px)
    transition: all .7s ease
    margin: 0 0 1px 0
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
 

.title
  margin: 10px 0 20px 0 !important
  position: relative
  padding: 0 0 0 75px !important
  &:after
    position: absolute
    left: 10px
    top: 2px
    content: ''
    background: url("data:image/svg+xml,%3Csvg height='500' width='500' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m0 250a250 250 0 1 1 500 0 250 250 0 0 1 -500 0zm97-103v106h42v-16h-26v-31h19v-16h-19v-27h26v-16zm80 91c6 0 8-4 8-11v-52c0-8-4-12-13-12h-4v75zm-25-91h23c19 0 27 10 27 29v48c0 20-8 29-26 29h-24zm63 25c0-17 9-27 25-27s24 9 24 27v10h-16v-11c0-8-3-11-8-11-6 0-9 3-9 11v59c0 7 3 11 9 11 5 0 8-4 8-11v-17h-10v-13h26v53h-8l-3-7c-4 7-9 10-16 10-14 0-22-11-22-30zm64-25h43v16h-26v27h18v16h-18v31h26v16h-43zm-167 234h-17v-106h24c18 0 26 8 26 30 0 13-3 21-10 26l12 50h-17l-10-45h-8zm0-60v-31h6c8 0 10 3 10 15 0 11-2 16-10 16zm53-46 10 42h1l10-42h17l-19 62v44h-16v-42l-20-64zm69 90c6 0 9-4 9-11v-51c0-9-4-13-13-13h-4v75zm-24-90h23c18 0 27 9 27 29v47c0 20-8 30-26 30h-24zm136 46v-31h6c8 0 10 3 10 15 0 11-2 16-10 16zm-72-46h43v15h-26v28h19v15h-19v32h26v16h-43zm72 106h-16v-106h24c17 0 25 8 25 30 0 13-3 21-10 26l12 50h-17l-10-45h-8zm57-30c1 11 4 16 11 16 6 0 10-4 10-10 0-9-6-14-15-23-12-12-20-21-20-35 0-15 11-26 25-26s24 10 25 26l-16 2c-1-9-3-13-9-13-5 0-9 4-9 10 0 9 7 16 17 25 11 11 18 19 18 34s-11 26-26 26-26-11-27-29zm-65-172v-42h-42a42 42 0 1 1 42 42z' fill='%23F15C33' fill-rule='evenodd'/%3E%3C/svg%3E") no-repeat
    background-size: contain
    width: 60px
    height: 100%
.date
  background: white
  padding: 7px 12px 5px
  margin: 20px
  position: absolute
  bottom: 0px
  left: 0px
  font-weight: 900
  display: inline-block
h1
  display: flex
  align-content: center

.grid
  width: 98%
  margin: 0 auto
  columns: 2
  page-break-inside: avoid
  column-gap: 30px
  padding-top: 0 !important

.intro
  display: flex
  padding: 10px
  margin: 0 0 10px 0
  .paragraph
    border-radius: 5px
    width: 60%
    padding: 10px !important
    line-height: 30px !important
    .question_mark
      margin-left: 0px
      background: url("data:image/svg+xml,%3Csvg width='65' height='114' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath  d='M16.4 113.8v-16h16.1v16h-16zm0-32.2V65.5h16.1v16h-16zM.3 33.2V17h16.1v16H.3zm32.2 32.3V49.3h16.2v16.2H32.5zm16.2-16.2V17.1h16.1v32.2H48.7zm0-32.2H16.4V.9h32.3v16.2z' fill='%23FFF' fill-rule='nonzero'/%3E%3C/svg%3E") #F15133 
      width: 20px
      display: block
      background-repeat: no-repeat !important
      height: 20px
      margin: 0px 0px 10px 0
      position: relative
      top: 5px
      background-size: 4px
      background-position: center
  .get_involved
    margin: 0 0 0px 20px !important
    border-left: 1px solid #efefef
    height: 60%
    padding: 0 0 40px 40px !important
    h1
      font-size: 22px !important
      margin: 50px 0 0 0
      color: orangered
      a
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ff4720' fill-opacity='0.51' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")
        background-size: 3px
        color: black !important
        border-bottom: 5px solid rgba(0,0,0,0.03)
        color: orangered
        line-height: 26px
        text-decoration: none !important
        font-size: 22px
        width: 60%
        padding: 47px 75px 20px 25px
        position: relative
        &:after
          height: 20px
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1' viewBox='0 0 100 125'%3E%3Cpath fill='white' d='M53 36h9v9h-9zM44 27h9v9h-9zM35 18h9v9h-9zM35 72h9v9h-9zM44 63h9v9h-9zM53 54h9v9h-9zM62 45h9v9h-9z'/%3E%3C/svg%3E") black
          width: 20px
          border-radius: 1px
          content: ''
          position: absolute
          right: 20px
          bottom: 20px !important
          background-repeat: no-repeat 
          background-size: 14px
          background-position: center 100% !important

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
  .permalink
    width: 70%
    height: auto
    display: flex
    text-decoration: none
    line-height: 25px
    margin-bottom: 70px
  .arrow
    width: 37px
    flex-shrink: 0
    float: left
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 78 97.5'%3E%3Cpath fill='%23fff' d='M60 36v-6h-6v6H12v6h42v6h6v-6h6v-6h-6zM48 24v6h6v-6h-6zM42 18v6h6v-6h-6zM36 12v6h6v-6h-6zM48 54h6v-6h-6v6zM42 60h6v-6h-6v6zM36 66h6v-6h-6v6z'/%3E%3C/svg%3E") #000
    background-position: center 60%
    background-repeat: no-repeat
    background-size: 18px, 100%
    margin: 20px 0
    transform: translateX(-40px)
    position: relative
    z-index: 0
    transition: all .7s ease
  img
    width: 100% !important
  .thumb
    height: auto
    min-height: 200px
    width: 100%
    overflow: hidden
    position: relative
    background-size: cover
    background-position: 50%
    background-color: #21D4FD
    background-color: #FAD961
    background-image: linear-gradient(90deg, #FAD961 0%, #F76B1C 100%)
    .social_shortcuts
      width: 30px;
      position: absolute;
      top: 20px;
      right: 20px;
      display: flex;
      flex-direction: column;
    img
      position: absolute
      top: 0
      object-fit: cover !important
      display: block
      width: 100%
      height: 100%
    &:hover
      .social_shortcuts a
        transform: translateX(0px)
        opacity: 1
      .arrow
        transform: translateX(0px)
        opacity: 1
    h1
      padding: 12px 14px
      margin: 20px 0 20px 20px
      float: left
      background: white
      font-size: 1.3rem
      color: black
      display: inline-block !important
      width: auto
      position: relative
      z-index: 1
  .exerpt
    padding: 5px 20px


@media (max-width: 1050px)
  .nav_bar
    position: absolute !important
    top: 0 !important
    left: 0
    display: flex
    align-items: center
    width: 100%
    padding: 30px 10% 0 !important
    height: 70px
    background: #fff
  .intro
    margin: 60px 0 20px 0 !important
    padding: 0 !important
    .paragraph
      width: 100%
      margin: 0 !important
    .get_involved
      padding: 30px 0 0 0 !important
      border: 0 !important
      margin: 20px 0px 0 30px !important
      h1
        margin: 10px 0 !important
      a
        margin: 0 !important
        width: 100% !important
  .title
    margin: 10px 0 20px 0 !important
    position: relative
    padding: 0px 0 0 70px !important
  .grid
    columns: 1

@media (max-width: 800px)
  .nav_bar
    padding: 30px 35px 0 !important
  .wrapper 
    padding: 0 20px  !important
  .intro
    display: block
    margin: 110px 0 20px 0 !important
    padding: 15px !important
    border: 1px solid rgba(0,0,0,0.1)
    border-radius: 10px
    .question_mark
      display: none !important
    .get_involved
      padding: 0 !important
      border: 0 !important
      margin: 5px 10px 0 !important
      h1
        margin: 0 !important
        width: 80%
        a
          padding: 23px 25px 20px !important
          &:after
            bottom: 0px !important
            right: 0 !important
            background-position: center 80% !important
            height: 22px

</style>
