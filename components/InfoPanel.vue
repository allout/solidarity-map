<template>
  <div class="info-panel py-5" :style="infoStyle">
    <h3 class="headline text-center font-weight-bold mb-5">
      Story copy goes here
    </h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
      molestie felis ut pulvinar iaculis. Vivamus dictum libero sed elementum
      facilisis. Suspendisse tempus nisi vel arcu pharetra, sit amet imperdiet
      odio dignissim. Fusce non magna finibus, ullamcorper nibh ullamcorper,
      aliquam eros. Mauris id leo tortor. Sed lobortis congue feugiat. Cras
      feugiat elit ante, a volutpat lorem viverra ac. Vestibulum ante ipsum
      primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean
      sit amet porttitor nisl. Vestibulum iaculis mi at magna mollis molestie id
      id dolor. Nunc a nibh lobortis, pharetra arcu et, euismod ex.
    </p>
    <p>
      Pellentesque eu tristique elit. Vivamus interdum sagittis convallis.
      Curabitur aliquet sed ipsum vitae pretium. Maecenas turpis ligula,
      hendrerit ut dictum in, convallis sit amet justo. Vestibulum dictum,
      lectus posuere aliquet blandit, ex augue sodales ligula, tristique
      tristique augue dolor at magna. Nullam pulvinar nec orci ut finibus. In
      tempus accumsan orci, vitae iaculis diam mattis vel. Fusce eget tellus at
      lacus posuere efficitur. Proin eu iaculis felis. Quisque ut egestas odio.
      Orci varius natoque penatibus et magnis dis parturient montes, nascetur
      ridiculus mus. Cras molestie lobortis felis, non molestie neque convallis
      nec. Integer nec mattis enim. Praesent in nibh eget nibh posuere aliquet.
      Integer in tortor vel nisl cursus facilisis ut ac leo. In hac habitasse
      platea dictumst.
    </p>
    <p>
      Sed consectetur auctor diam, in egestas libero sodales id. Fusce leo
      massa, mollis non justo ac, accumsan molestie magna. Nam at dolor mauris.
      Mauris iaculis pharetra convallis. Integer posuere mauris in fringilla
      tristique. Fusce vel lacus congue magna pharetra condimentum. Praesent leo
      nisl, dignissim ac lorem in, volutpat congue lorem. Donec in mi massa.
      Maecenas non ante sed urna molestie elementum. Maecenas bibendum egestas
      ultrices. Maecenas accumsan efficitur turpis facilisis suscipit. Sed a
      eros sed quam auctor consequat quis ut diam. Vivamus lobortis id elit ac
      lacinia.
    </p>
    <p>
      Proin vel lorem eu nisl varius ultrices. Fusce ultrices fermentum erat, et
      mattis leo hendrerit vel. Ut eu faucibus felis, id ultricies lacus. Nam ut
      urna eget enim finibus mollis sed eu nisi. Suspendisse quis risus libero.
      Maecenas vehicula rhoncus tellus, porttitor faucibus purus placerat
      vestibulum. Sed quis interdum nibh. Cras sollicitudin, leo ac pulvinar
      ultricies, dui massa rhoncus nibh, eget ultricies nulla justo pulvinar
      massa. Morbi accumsan sollicitudin tellus vitae tincidunt. Donec sodales
      risus nulla, at sagittis elit vestibulum sit amet.
    </p>
    <p>
      Quisque elementum vel dui sit amet ornare. Fusce eu vestibulum arcu. In
      hac habitasse platea dictumst. Nam lectus lectus, ornare mollis vulputate
      eget, tristique sit amet enim. Aenean accumsan vitae ex quis interdum.
      Cras id mi nec turpis vestibulum laoreet. Maecenas tellus nibh, dignissim
      sodales orci in, gravida tincidunt augue. Donec iaculis finibus rhoncus.
      Cras malesuada lacus id elit sodales, sodales dignissim dui rhoncus.
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Fusce tincidunt vestibulum molestie.
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'InfoPanel',
  computed: {
    infoMinHeight() {
      return `calc(100vh - ${this.appBarHeight}px)`
    },
    infoStyle() {
      return `min-height: ${this.infoMinHeight};`
    },
    ...mapState('app', ['appBarHeight'])
  }
}
</script>

<style lang="scss" scoped></style>
