module.exports = {
    title: '个人博客',
    description: 'Just playing around',
    port: '8808',
    head: [
        ['link', { rel: 'icon', href: '/assets/img/logo.png' }] // 需要被注入到当前页面的 HTML <head> 中的标签
    ],
    markdown: {
        lineNumbers: true,
        // 默认值: ['h2', 'h3']只有在sidebarDepth: 2时才起作用
        // extractHeaders: ['h2', 'h3', 'h4'],
        // 目录
        toc: { includeLevel: [2, 3] },
    },
    plugins: [
        ['vuepress-plugin-code-copy', true],
        ['@vuepress/nprogress'],
        ['@vuepress/back-to-top'],
        ['@vuepress/medium-zoom',
            {
                options: {
                    margin: 16
                }
            }]
    ],
    themeConfig: {
        // sidebar: 'auto',
        // 默认的深度是 1，它将提取到h2的标题，设置成 0 将会禁用标题(headers)链接，同时，最大的深度为 2，它将同时提取h2 和h3 标题,如果想要额外拓展,支持h1~h6,在 markdown 配置拓展中markdown.extractHeaders
        // sidebarDepth: 2,
        logo: '/assets/img/logo.png',
        smoothScroll: true,
        nav: [
            { text: '个人简介', link: '/main/' },
            {
                text: '前言技术',
                items: [
                    { text: 'text2img', link: '/ai/text2image/' },
                ]
            },
            {
                text: '前端技术',
                items: [
                    { text: 'Vue', link: '/frontend/vue/' },
                ]
            },
            {
                text: '后端技术',
                items: [
                    { text: 'Java', link: '/backend/java/' },
                    { text: 'Python', link: '/backend/python/' },
                    { text: 'Go', link: '/go/' },
                    { text: 'NetCore', link: '/netcore/' }
                ]
            },
            {
                text: 'DevOps',
                items: [
                    { text: 'DevOps', link: '/devops/' },
                    { text: 'Jenkins', link: '/jenkins/' },
                    { text: 'Docker', link: '/docker/' },
                    { text: 'Linux', link: '/linux/' }
                ]
            }
        ],
        sidebar: {
            '/main/': [
                {
                    title: '个人简介',
                    link: '/main/',
                    collapsable: true,
                    children: [
                        '/main/'
                    ]
                }
            ],
            '/backend/java/': [
                {
                    title: 'Java',
                    link: '/backend/java/',
                    collapsable: true,
                    children: [
                        '/backend/java/',
                        '/backend/java/qsv/',
                        '/backend/java/qsv/java.md'
                    ]
                }
            ],
            '/backend/python/': [
                {
                    title: 'Python',
                    link: '/backend/python/',
                    collapsable: true,
                    children: [
                        '/backend/python/',
                    ]
                }
            ],
            '/ai/text2image/': [
                {
                    title: 'Text2Image',
                    link: '/ai/text2image/',
                    collapsable: true,
                    children: [
                        '/ai/text2image/',
                        '/ai/text2image/sd/sd-1.md'
                    ]
                }
            ]            
        }
    }
}
