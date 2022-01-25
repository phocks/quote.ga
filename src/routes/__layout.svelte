<div class="main"><slot /></div>

<style lang="scss">
  :global(body) {
    margin: 0;
  }

  .main {
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: #f8f8f8;
    position: relative;
  }
</style>
