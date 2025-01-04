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
                <div class="year">{{ key }}</div>
                <div v-for="blog in blogList" :key="blog.text">
                    {{ blog.text }}
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
li {
    list-style: none;
}

.year {
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: rgb(170, 170, 170);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-feature-settings: normal;
    font-size: 128px;
    font-variation-settings: normal;
    font-weight: 700;
    line-height: 224px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    scrollbar-color: rgb(238, 238, 238) rgb(255, 255, 255);
    tab-size: 4;
    text-size-adjust: 100%;
    position: absolute;
    top: -32px;
    left: -48px;
    opacity: .1;
    color: transparent;

}
</style>