<template>
    <el-aside class="layout-aside">
        <Logo />
    </el-aside>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Logo from '/@/views/layout/logo/index.vue';
export default defineComponent({
    name: 'LayoutAside',
    components: {
        Logo,
    },
});
</script>
<style lang="scss"></style>
