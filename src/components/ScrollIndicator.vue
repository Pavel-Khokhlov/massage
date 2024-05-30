<template>
  <div class="scroll" :style="{ width: `${scrollWidth}vw` }"></div>
</template>

<script>
export default {
  data() {
    return {
      scrollWidth: 0,
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll(event) {
      let scrollHeight = Math.max(
        event.target.body.scrollHeight,
        event.target.documentElement.scrollHeight,
        event.target.body.offsetHeight,
        event.target.documentElement.offsetHeight,
        event.target.body.clientHeight,
        event.target.documentElement.clientHeight
      );

      const maxScrollableHeight = scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const position = (scrollY / maxScrollableHeight) * 100;
      this.scrollWidth = position;
    },
  },
};
</script>

<style lang="sass">
@import @/sass/index
.scroll
    position: absolute
    top: 0
    left: 0
    height: 2px
    background: $base-brand-color
</style>
