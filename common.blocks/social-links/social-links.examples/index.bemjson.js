({
    block: 'page',
    title: 'Social Links',
    mods: { theme: 'alfa-on-color' },
    head: [{ elem: 'css', url: 'index.min.css' }],
    scripts: [{ elem: 'js', url: 'index.min.js' }],
    content: [
        {
            block: 'example-section',
            title: 'Default',
            content: ['alfa-on-color', 'alfa-on-white'].map(function(theme) {
                return {
                    elem: 'col',
                    elemMods: { theme: theme },
                    content: ['s', 'm', 'l', 'xl'].map(function(size) {
                        return [
                            {
                                elem: 'size',
                                content: size
                            },
                            {
                                elem: 'item',
                                content: {
                                    block: 'social-links',
                                    mods: { theme: theme, size: size },
                                    links: [
                                        { network: 'twitter', url: 'http://twitter.com/...' },
                                        { network: 'facebook', url: 'http://facebook.com/...' }
                                    ]
                                }
                            }
                        ];
                    })
                };
            })
        }
    ]
});
