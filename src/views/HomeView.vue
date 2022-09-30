<template>
  <div>home...{{ UserInfo }}</div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
export default defineComponent({
  computed: {
    ...mapState(['UserInfo'])
  }
})
</script>

<style lang="scss" scoped></style>
