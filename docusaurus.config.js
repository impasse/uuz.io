// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Yooyi\'s blog',
  tagline: 'Yooyi\'s personal website',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://uuz.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'impasse', // Usually your GitHub org/user name.
  projectName: 'uuz.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 3, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
    ['@docusaurus/theme-live-codeblock', {}],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/impasse/uuz.io/tree/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Yooyi\'s Blog',
        logo: {
          alt: 'Yooyi\'s blog',
          src: 'img/logo.jpg',
        },
        items: [
          { to: '/blog', label: 'Blog', position: 'left' },
          { to: '/links', label: 'Links', position: 'left' },
          { to: '/about', label: 'About', position: 'left' },
          {
            href: 'https://github.com/impasse/uuz.io',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Links',
            items: [
              {
                label: 'Blog',
                to: '/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/impasse',
              },
              {
                label: 'Mail',
                href: 'mailto:i@uuz.io',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Yooyi.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      liveCodeBlock: {
        playgroundPosition: 'bottom',
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      algolia: {
        appId: 'XUN6IIWNRP',
        apiKey: 'befec494e066b6296eab53975fe8f334',
        indexName: 'uuz',
      },
    }),
};

module.exports = config;
