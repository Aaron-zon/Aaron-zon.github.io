<script setup>
// import { data as blogRouter } from './blog.data'
import { blogRouter } from '../.vitepress/blogRouter'
import { onMounted, computed, ref } from 'vue';
import { withBase } from 'vitepress'

console.log('sda', blogRouter)
</script>

<template>
    <div>Blog</div>
    <div class="blog-container">
        <ul>
            <li v-for="(blogList, key) in blogRouter" :key="key">
                <div v-for="blog in blogList" :key="blog.text">
                    {{ blog.text }}
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>

</style>