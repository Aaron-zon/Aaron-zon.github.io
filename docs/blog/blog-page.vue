<script setup>
import { blogRouter } from '../.vitepress/blogRouter'
import { onMounted, computed, ref } from 'vue';
import { withBase } from 'vitepress'

</script>

<template>
    <div>Blog</div>
    <div class="blog-container">
        <ul class="year-blog-wrapper">
            <li class="year-blog-group" v-for="(blogList, year) in blogRouter" :key="year">
                <div class="year">{{ year }}</div>
                <p v-for="item of blogList" :key="item.text" class="year-blog-item">
                    <a :href="withBase(item.link) + '.html#'">{{ item.text  }}</a>
                </p>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.year-blog-wrapper {
    list-style: none;
    position: relative;
}

.year {
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: rgb(80, 80, 80);
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
    top: -70px;
    left: -50px;
    opacity: .2;
    color: transparent;
    z-index: -1;
}
</style>