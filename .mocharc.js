'use strict'

module.exports = {
    recursive: true,
    colors: true,
    checkLeaks: true,
    reporter: 'list',
    package: './package.json',
    require: ['@babel/register', './test/setup']
}
