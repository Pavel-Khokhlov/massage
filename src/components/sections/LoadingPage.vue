<template>
    <div class="loading">
      <p class="loading__text">Loading >>></p>
    </div>
  </template>
  
  <style lang="sass">
  @import @/sass/index
  .loading
    position: sticky
    top: 0
    left: 0
    width: 100vw
    height: 100vh
    display: flex
    justify-content: center
    align-items: center
    background: $base-brand-color
    z-index: 10
    &__text
      font-size: 24px
      color: $base-white-color
      margin: 0
      padding: 0
  </style>