<template>
    <el-container class="layout-container">
        <Aside />
        <el-container class="flex-center layout-backtop"></el-container>
    </el-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Aside from '../component/aside.vue';
import Main from '../component/main.vue';
export default defineComponent({
    name: 'LayoutDefaults',
    components: { Aside, Main },
});
</script>
<style lang="scss"></style>
