<template>
  <div class="body">
    <topbar class="navbar">
      <div
        class="bgimage"
      >
      </div>
      <nuxt-link to="/"
        ><Logo fill="#fff" variation="icon" size="large" />
        <h1>Campaigns</h1></nuxt-link
      >
    </topbar>
    <div
      class="hero"
    >
     <div class="hero_image domain_experts">
      </div>
    </div>

    <Wrapper style="padding: 44px 220px">
      <h1>Get involved</h1>  
      <p>Edgeryders is a social enterprise, and an open and distributed think tank of people working through an online social network and a series of conferences. We're looking for people on paths of radical discovery at the edge of their professions and industries.. Whether it be social policy, technology, healthcare, public services or the private domain — we would like to know more about you and how you might want to participitate in our events, community meetings, conferences and publications.</p>

     <h1>What's your field?</h1>  
     <p>We don't expect you to fit into any one category, but if you were to best describe your area of expertise, what would it be? If none are listed below, choose the 'other' option and describe it in the form below.</p>
      
      <div class="domains">
      <div class="group domain_experts" @click="group = 'domain_expert'" :class="{ active: group === 'domain_expert' }">
        <h4>Domain Expert</h4>
      </div>

      <div class="group policy_maker" @click="group = 'policy_maker'" :class="{ active: group === 'policy_maker' }">
        <h4>Policymaker &amp; Voter</h4>
      </div>

      <div class="group tech_insider" @click="group = 'tech_insider'" :class="{ active: group === 'tech_insider' }">
        <h4>Tech Insider</h4>
      </div>

      <div class="group investor" @click="group = 'investor'" :class="{ active: group === 'investor' }">
        <h4>Investor</h4>
      </div>

      <div class="group other" @click="group = 'other'" :class="{ active: group === 'other' }">
        <span class="other">?</span>
        <h4>Other</h4>
      </div>

    </div>

      <h1>Tell us a bit about yourself</h1>  
     <p>If you’d like to learn how to plug into our work directly please let us know more about yourself below. We’ll review your background and do our best to connect you with the most appropriate projects happening in our network.</p>
      
      <div class="details">
      <div class="input name">
     <label>First Name</label>
     <input v-model="first_name" placeholder="First Name">
      </div>

      <div class="input name">
     <label>Last Name</label>
     <input v-model="last_name" placeholder="Last Name">
      </div>
      
      <div class="input">
     <label>Email</label>
     <input v-model="email" placeholder="Email">
     </div>
      
      <div class="input">
     <label>City</label>
     <input v-model="city" placeholder="City">
     </div>
    
     <div class="input">
     <label>Country</label>
     <input v-model="country" placeholder="Country">
     </div>
    
    <div class="input">
    <label>Personal Site / LinkedIn</label>
     <input v-model="site" placeholder="Personal Site or LinkedIn">
     </div>

      
      <p class="background_text">Please provide 2-4 sentences about your life experience as it relates to your domain, or anything else you would like to add. (Optional)</p>
     <textarea class="background_input" v-model="last_name" placeholder="Share Your Background" />


     <h4>Would you like to receive occasional updates?</h4>
     <div class="updates">
 <div class="checkbox">
    <input id="one" type="radio" v-model="subscribed"  value="true">
    <span class="check"></span>
    <label for="one">Sure</label>
  </div>
   <div class="checkbox">
    <input id="two" type="radio" v-model="subscribed"  value="false">
    <span class="check"></span>
    <label for="two">No Thanks</label>
  </div>
</div>

  <Button class="submit">Get Connected</Button>
   </div>


    </Wrapper>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import topbar from "./../components/topnav.vue";
export default {
  name: "Index",
  release: "1.0.0",
  metaInfo: {
    title: "Untitled Edgeryders Project",
    htmlAttrs: {
      lang: "en"
    }
  },
  components: {
    topbar
  },
  asyncData({ params }) {
    return {
      slug: params.slug,
    };
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("MMMM Do YYYY");
    }
  },
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      city: "",
      country: "",
      site: "",
      background: "",
      subscribed: "",
      group: ""
    };
  },
  props: {
    type: {
      type: String,
      default: "div"
    }
  },
  mounted: function() {
  },
  created() {
    if (process.browser) { 
        window.addEventListener("scroll", this.handleSCroll)
    }
  },
  methods: {
    handleSCroll(event) {
      
    },
    vuecopydemo() {
      this.$refs.text.select();
      const link = "https://edgeryders.eu/" + this.$refs.text.select()
      document.execCommand('copy');
      this.copied = true;
      setTimeout(() => this.copied=false, 2000);

    },
    loadItems: function() {
      }
  }
};
</script>

<style lang="sass" scoped>

.updates
  width: 100%
  display: inline-block
.submit
  box-shadow: inset 0 0 0 2px #6C63FF !important
  color: #fff !important
  padding: 12px 10px 11px !important
  background: #6C63FF !important
.checkbox
  width: 110px
  margin:  0 0 20px 0
  display: flex
  float: left
  align-items: center
  user-select: none
  label
    font-size: 14px
    color: #000
    font-weight: bold
    position: absolute
    z-index: 10
    padding-left: 45px
    cursor: pointer
  input
    opacity: 0
    visibility: hidden
    position: absolute
    &:checked ~ .check
      border-color: #6C63FF
      box-shadow: 0px 0px 0px 16px #6C63FF inset
      &::after
        opacity: 1
        transform: scale(1)
  .check
    width: 30px
    height: 30px
    display: flex
    justify-content: center
    align-items: center
    position: relative
    border-radius: 100px
    background-color: #FFF
    border: 2px solid #6C63FF
    box-shadow: 0px 0px 0px 0px #00EA90 inset
    transition: all 0.15s cubic-bezier(0, 1.05, 0.72, 1.07)
    &::after
      content: ''
      width: 100%
      height: 100%
      opacity: 0
      z-index: 4
      position: absolute
      transform: scale(0)
      background-size: 50%
      background-image: url("http://moiza.ir/checkmark.svg")
      background-repeat: no-repeat
      background-position: center
      transition-delay: 0.2s !important
      transition: all 0.25s cubic-bezier(0, 1.05, 0.72, 1.07)

.details
  .input
    display: flex
    width: 100%
    height: 50px
    margin: 30px 0 20px 0
    label
      width: 120px !important
      display: flex
      padding: 0 20px 0 5px
      font-weight: bold
      color: black
      align-items: center
      text-align: left
    input
      width: 65%
      height: 20px
      display: inline-block
      font-size: 16px
      padding: 13px
      margin: 0 0 15px 0
  .background_input
    width: 83% !important
    border: 1px solid rgba(0,0,0,0.1)
    font-size: 16px
    padding: 13px
    margin: 10px 0 0px 0
  .background_text
    font-weight: bold
    margin: 40px 0 10px
    width: 80%
    padding: 0 0 0 5px

.group
  border: 1px solid rgba(0,0,0,0.1)
  width: 30%
  height: 250px
  display: inline-block
  float: left
  margin: 20px 20px 0 0
  padding: 0 !important
  background-size: 90% !important
  background-position: center 15px !important
  background-repeat: no-repeat !important
  position: relative
  &.domain_experts
    background: url('~assets/domain_experts.svg')
  &.policy_maker
    background: url('~assets/policy_maker.svg')
    background-position: center 30px !important
  &.tech_insider
    background: url('~assets/tech_insider.svg')
  &.investor
    background: url('~assets/investor.svg')
  &.other
    background: white !important
    display: flex
    justify-content: center
    span.other
      background: #6C63FF
      border-radius: 100px
      color: #fff
      display: flex
      justify-content: center
      align-items: center
      margin: 50px 0 0 0
      width: 40%
      height: 40%
      border: 4px solid #6C63FF
      font-size: 40px
  h4
    position: absolute
    bottom: 0 !important
    width: 86%
    left: 0
    height: 24px
    padding: 5% 7% !important
    background: black
    color: white
    margin-block-start: 0 !important
    margin-block-end: 0 !important
  &.active
    box-shadow: 0 0 10px rgba(0,0,0,0.2)
    h4
      background: #6C63FF
  &:hover
    cursor: pointer
.domains
  width: 100%
  display: inline-block
  clear: both
.hero
  overflow: hidden
  .hero_image
    width: 100%
    height: 450px
    float: left
    &.domain_experts
      background: url('~assets/domain_experts.svg')
      background-repeat: no-repeat
      animation: slideleft 120s ease forwards
@keyframes slideleft
  0%
    transform: translateX(-145px) scale(1.1)
  100%
    transform: translateX(0px) scale(1)

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
  background: #000
  overflow: hidden
  position: fixed
  top: 0
  z-index: 99999
  .bgimage
    height: 90px
    width: 100%
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
    margin: 20px
.hero
  height: 450px !important
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ff4720' fill-opacity='0.51' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E") !important
  background-size: 4px
  position: relative
  background-attachment: fixed
  .social
    width: auto
    padding: 4px 1px 3px 5px
    display: flex
    .linkedin
      background-size: 12px !important
      background-position: center 12px !important
    .facebook
      background-size: 12px !important
    .twitter
      background-size: 12px !important
    .email
      background-size: 11.3px !important
      background-position: center 14px !important
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
      margin: 0 5px 0 0 !important
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
        white-space: nowrap
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
      div
        width: 33px
        height: 33px
        background-position: center 54% !important
        background-repeat: no-repeat !important
        background-size: 12px, 100% !important
        transform: translateX(100px)
        transition: all .7s ease
        margin: 0 0 .5px 0
        opacity: 0
      .twitter
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1' viewBox='0 0 512 512'%3E%3Cpath fill='%23fff' d='M445 161V95h-33V61h-34V28H256v33h-33v34h-34v66h-44v-33h-45V95H67V61H0v189h33v34h34v33h67v34h-34v33H67v33H33v67h312v-33h33v-34h34v-33h33V262h34v-34h33v-67z'/%3E%3C/svg%3E") #000
      .facebook
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1' viewBox='0 0 512 512'%3E%3Cpath fill='%23fff' d='M412 122V0H234v33h-34v34h-33v100h-67v122h67v223h134V289h66V167h-66v-45z'/%3E%3C/svg%3E") #000
        transition-delay: .1s
      .linkedin
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1' viewBox='0 0 512 512'%3E%3Cpath fill='%23fff' d='M11 167h111v345H11zM100 33V0H33v33H0v67h33v34h67v-34h34V33zM479 234v-34h-34v-33H289v33h-33v-33H156v345h111V301h34v-34h66v34h34v211h111V234z'/%3E%3C/svg%3E") #000
        transition-delay: .15s
      .email
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
  .group
    border: 1px solid rgba(0,0,0,0.1)
    width: 45%
    height: 200px
    display: inline-block
    float: left
    margin: 20px 20px 0 0
    padding: 0 !important
    background-size: 90% !important
    background-position: center 15px !important
    background-repeat: no-repeat !important
    position: relative
  .hero_image
    width: auto
    height: 200px
    background-size: contain !important
    background-position: 20% 30% !important
    animation: none !important
  .wrapper
    padding: 0 30px !important
  .campaign_title
    display: inline-block
    width: 100%
    clear: both
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
</style>
