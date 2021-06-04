<template>
    <el-main class="layout-main">
        <LayoutParentView />
    </el-main>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import LayoutParentView from '/@/views/layout/routerView/parent.vue';
export default defineComponent({
    name: 'LayoutMain',
    components: {
        LayoutParentView,
    },
});
</script>
<style lang="scss"></style>
