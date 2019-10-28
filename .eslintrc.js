module.exports = {
    root: true,
    parserOptions: {
      parser: 'babel-eslint'
    },
    plugins: ['vue'],
    extends: ['plugin:vue/essential', 'airbnb-base'],
    env: {
      browser: true,
      commonjs: true,
      es6: true,
      jest: true,
      node: true
    },
    globals: {
      __ENV__: true,
      __MODE__: true,
      __PORT__: true,
      wx: true,
      Swiper: true
    },
    rules: {
      'generator-star-spacing': 'off',
      'func-names': 0,
      'linebreak-style': 0,
      'no-new': 0,
      'no-debugger': 0,
      'no-console': 0,
      'no-alert': 0,
      'no-param-reassign': 0,
      'no-use-before-define': 0,
      'import/named': 0,
      'import/no-unresolved': 0,
      'import/export': 0,
      'import/order': 0,
      'import/no-extraneous-dependencies': 0,
      'import/prefer-default-export': 0,
      semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
      'comma-dangle': 0,
      'space-before-function-paren': 0,
      'arrow-parens': 0,
      quotes: 0,
      'no-plusplus': 0,
      'space-unary-ops': 0,
      'no-underscore-dangle': 0,
      'class-methods-use-this': 0,
      radix: 0,
      'object-curly-newline': 0,
      'no-tabs': 0,
      'no-multi-assign': 0,
      'operator-linebreak': 0,
      'implicit-arrow-linebreak': 0,
      'no-unused-vars': ['error', { argsIgnorePattern: 'h' }],
      'max-len': ['error', { code: 200 }],
      indent: 0,
      'prefer-template': 0,
      camelcase: 0,
      'eol-last': 0,
      /* 按需加载import()必须加webpackChunkname */
      'import/dynamic-import-chunkname': [
        2,
        {
          importFunctions: [],
          webpackChunknameFormat: '[0-9a-zA-Z-_/.]+'
        }
      ]
    }
  }
  