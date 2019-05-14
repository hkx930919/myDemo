module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'linebreak-style': [0, 'error', 'windows'],
    'no-empty-function': 0,
    'func-names': 0,
    'no-plusplus': 0,
    'no-return-assign': 0,
    'no-extend-native': 0,
    'no-underscore-dangle': 0,
    'prefer-rest-params': 0,
    eqeqeq: 0,
    'max-len': 0,
    'no-prototype-builtins': 0, //不准使用Object的原型方法
    'no-restricted-syntax': 0, //不准使用一些语法
    'consistent-return': 0,
    'no-shadow': 1,
    'no-var': 1,
    'no-eval': 1,
    'no-continue': 1,
    'no-unused-vars': 1,
    'no-await-in-loop': 0,
  },
  globals: {
    eval: false,
    window: false,
    MessageChannel: false,
    throw: false,
  },
};
