import fs from 'fs'
import path from 'path'
import { blogRouter } from '../.vitepress/blogRouter'

interface BlogHeader {
    anchor: string
    text: string
}

export interface BlogGroup {
    year: number
    text: string
    anchor: string
    items: {
        text: string
        link: string
        headers: BlogHeader[]
    }[]
}

export declare const data: BlogGroup[]

export default {
    watch: './*.md',
    load() {
        console.log(blogRouter)
        return []
    }
}