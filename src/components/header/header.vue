<template>
  <div class="header">
    <div class="icon-wrapper">
      <i class="icon-menu"></i>
      <div class="icon-middle">
        <i class="icon-music"></i>
        <i class="icon-wangyi"></i>
        <i class="icon-friend"></i>
      </div>
      <i class="icon-search"></i>
    </div>
  </div>
</template>
<script type="text/javascript">
</script>
<style lang="scss" type="text/css">
.header {
  width: 100%;
  .icon-wrapper {
    padding: 0 10px;
    height: 36px;
    line-height: 36px;
    color: #fff;
    background: rgb(192, 12, 12);
    text-align: center;
    .icon-middle {
      display: inline-flex;
      width: 50%;
      i {
        flex: 1;
      }
      .icon-wangyi {
        font-size: 18px;
      }
    }
    .icon-menu {
    	display: inline-block;
    	float: left;
    }
    .icon-search {
      float: right;
    }
  }
}
</style>
