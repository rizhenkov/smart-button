<template>
  <div
    class="absolute top-0 bottom-0 left-0 right-0 flex justify-stretch items-stretch -z-10"
  >
    <div class="lds-ring w-full h-full">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
</template>

<style lang="scss">
.lds-ring {
  display: inline-block;
  position: relative;
  transform: scale(1.2);

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 0;
    left: auto;
    right: auto;
    bottom: auto;
    width: 100%;
    height: 100%;
    margin: 0;
    border-width: 12px;
    border-style: solid;
    border-radius: 50%;
    animation: lds-ring 1.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    @apply border-transparent border-t-primary-600 border-opacity-50;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }

    &:nth-child(2) {
      animation-delay: -0.3s;
    }

    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
