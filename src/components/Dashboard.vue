<template>
  <div class="container">
    <section class="statistics">
      <div class="statistics__counter">
        <div class="statistics__counter--header">
          Total
        </div>
        <div class="statistics__counter--content">
          18
        </div>
      </div>
      <div class="statistics__counter">
        <div class="statistics__counter--header">
          Completed
        </div>
        <div class="statistics__counter--content">
          12
        </div>
      </div>
      <div class="statistics__counter">
        <div class="statistics__counter--header">
          Not completed
        </div>
        <div class="statistics__counter--content">
          6
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
};
</script>

<style scoped lang="scss">
$background-primary: #ffffff;
$box-shadow-primary: 0 1px 3px rgba(0,0,0,0.12);

.container {
  height: 100%;

  & .statistics {
    display: flex;
    align-items: center;
    box-shadow: $box-shadow-primary;
    width: 50%;
    height: 15%;
    padding: 20px;
    background-color: $background-primary;

    &__counter {
      width: 33%;
      text-align: left;

      &--header {
        color: #a2a2a2;
        font-size: 20px;
      }
      &--content {
        font-size: 42px;
        font-weight: 300;
      }
    }
  }
}

</style>
