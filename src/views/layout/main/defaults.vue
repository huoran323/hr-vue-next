<template>
    <el-container class="layout-container">
        <Aside />
    </el-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Aside from '../component/aside.vue';
export default defineComponent({
    name: 'LayoutDefaults',
    components: { Aside },
});
</script>
<style lang="scss"></style>
