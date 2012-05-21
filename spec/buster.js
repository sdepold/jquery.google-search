var config = module.exports

config["browser tests"] = {
  rootPath: '../',
  tests: [
    "spec/*.spec.js"
  ],
  environment: 'browser',
  libs: [
    "lib/jquery-1.7.2.min.js"
  ],
  sources: [
    'dist/*.min.js'
  ]
}
