export default{
  env: 'com',
  proxys: {
    com: [
      {
        root: '/api',
        urls: {
          '/pointbuy': 'http://h5.hclzx.com/api/pointbuy/',
          '/pbsupport': 'http://h5.hclzx.com/api/pbsupport/',
          '/simpb': 'http://h5.hclzx.com/api/simpb/',
          '/ass': 'http://h5.hclzx.com/api/ass/',
          '/advisers': 'http://h5.hclzx.com/api/advisers/',
          '/adviser': 'http://h5.hclzx.com/api/adviser/',
          '/activity': 'http://h5.hclzx.com/api/activity/',
          '/bonus': 'http://h5.hclzx.com/api/bonus/'
        }
      },
      {
        root: '/services',
        urls: {
          '/user': 'http://h5.hclzx.com/api/user/',
          '/funds': 'http://h5.hclzx.com/api/funds/',
          '/fundsext': 'http://h5.hclzx.com/api/fundsExt/',
          '/userExt': 'http://h5.hclzx.com/api/userExt/',
          '/pt': 'http://h5.hclzx.com/api/pt/'
        }
      }
    ]
  }
}
