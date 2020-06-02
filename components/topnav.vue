<template>
  <div class="topnav">
    <slot/>
  </div>
</template>
<script>

/**
 * Generic breadcrumb trail component.
 */
export default {
  name: "topnav",
  props: {
  },
  mounted() {
  },
  methods: {
  },
  watch: {
  }
};
</script>
<style lang="scss" scoped>

@import "~ER-design-system/dist/system/tokens/tokens.scss";
@import "~ER-design-system/dist/system/system.utils.scss";

.topnav {
  height: 90px;
  top: 0;
  width: 100%;
  display: block;
  @include reset;
  @include inset-space($space-l);
  font-family: $font-text;
  font-weight: $weight-normal;
  font-size: $size-m;
  line-height: $line-height-m;
  width: 100%;
  @media #{$media-query-l} {
    @include inset-space($space-xl);
  }
}
</style>
