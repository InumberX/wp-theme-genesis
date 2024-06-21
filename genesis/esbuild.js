const esbuild = require('esbuild')
const path = require('path')
const glob = require('fast-glob')
const entryPoints = glob
  .sync(['src/assets/js/*.*', 'src/assets/css/*.*'])
  .map((file) => file)
const sassPlugin = require('esbuild-plugin-sass')
const isWatch = process.argv.includes('--watch')

esbuild
  .context({
    entryPoints,
    outdir: 'assets',
    platform: 'browser',
    tsconfig: 'tsconfig.json',
    bundle: true,
    sourcemap: false,
    minify: true,
    splitting: false,
    plugins: [
      sassPlugin({
        customSassOptions: {
          loadPaths: ['src'],
        },
      }),
    ],
    external: ['*.svg', '*.png'],
  })
  .then((context) => {
    if (isWatch) {
      context.watch()
    } else {
      context.rebuild().then((result) => {
        context.dispose()
      })
    }
  })
  .catch(() => process.exit(1))
