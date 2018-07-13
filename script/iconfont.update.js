const Request = require('superagent')
const fs = require('fs')
const path = require('path')

const log = function (color, str) {
  console.log(color, `iconfont:${str}`)
}
const print = {
  success(str) {
    log('\x1b[32m%s\x1b[0m', str)
  },
  warning(str) {
    log('\x1b[33m%s\x1b[0m', str)
  },
  error(str) {
    log('\x1b[31m%s\x1b[0m', str)
  }
}

const pid = '691135'
const ctoken = '6Nh5RAdxgVlHSlrpM8jZicon-font'
const header = {
  Cookie: `trace=AQAAAEk8m1FWtgEALUARcBuSEPZlGHcj; ctoken=${ctoken}; EGG_SESS=u7jab9bfZ0Tjt_ZHcNgvn6nyxFIejOx3PaXKUPOVSLRk4T9bTpV8Ac0qaNAzXRi6sJ4FNtSpuJz3oSLzShHQW_gR-WT63f9Tg3jWkdKscu-R9KDet6M8N-6kV3fz41Crvtj7euqcWWR7F1z3d51pAwy3oRn14gMTb7MtsfJFWx8h7x0KrD7np7dv4ObmTf5rOUwDXT7AXZhvxpFZv6hFDLYseLh3ILahV-ZIixMqV-9PqGy_wOVttsCW84aKuO5NdocjhCoxbP6du7CgkRwAzwBkI-EAAtGBMoqb53RoinxPjLbpdHebTy_BMJzYaBnAlUyoXOOWeTzt1AruB3qbDmhZILUc0ZjLehQAvS4Gcubaqgjqu4_da3ONqsFdnzahuak09pDaY1h55nipchaJYtSOK1lIoRgD0l9saQpOv6jTZCRPtGXEiZYE0qmPFti_LEtlJI9c51rw4xSKh4Hx57FyGbYvl_B_YM3ht28l_XzTP6WGszTInI6hf-Hr3NQ4Xwenwd0bIPfGNb0h0fUT7gGaCfuNVypSo4EtgsVRp7I2FQfSkKHgk4IIrIq2w_OR29o3_YrBs61irELM6cpV9IHYUoIj-L8IeXlyU1UAE-xDPpSMyp69kVLXidnfUZOH3r-0Ym3dDACLQBXwv1C4qFe2QDb4LDx5PlAGfJINkG-RzcYjldwluBR_RCP-4lkr_EiIiCgfnk5bPgqz3lfK6yRABsMhopKfs_eC2fuST5cAUvDI1cRNq4G07H-SZZdf-Zp6Zd8NDsXEcSGLJwUc2_MlbF6E0mi2RgMJlfT-92WorSVjQIOiOFptba51FTfl3MRgyViaoILXqOS12pJgrN1yCIvoEz5ORegcTC-J8LsIg7d3jtIIj4HUIMiA2Z6WAq5eg_AfuwwHrWQTGEFJKEtD7ZRBQQu84XDXDqrJhccynNUjbuoCEYY_2MlvPm49RJFyMoTjc8AQrzMhVMlj7_JTUoe78x8lR2a_BoX7IjHeK7abt8-1lOUIYbvryhOKXGVt0ELm2jy1O1kp2n2WWrtIQ1yhCHglSUqQLv0Ln9sid5dy69SuMvciSb12n-xA7nSyk7LMHvMr_dDU2G9G0qplGL-TifVR7nBPFbI823w=; u=38316; isg=BLCw74JRnmc2wUINooNBoGbMgXjCUZXX1Wr43qoBwoveZVAPUglk0wYUuWsFdUwb`
}
const form = {
  pid,
  ctoken,
  t: new Date().getTime()
}
const detailUrl = 'http://www.iconfont.cn/api/project/detail.json'
const updateUrl = 'http://www.iconfont.cn/api/project/cdn.json'

const agent = Request.agent().accept('application/json').set(header)

async function main() {
  const result = JSON.parse((await agent.get(detailUrl).query(form)).text)
  const cssFileNow = result.data.font.css_file
  const fontIsOld = result.data.project.font_is_old
  const fileLocal = fs.readFileSync(path.resolve(__dirname, '../src/styles/scss/_iconfont.scss')).toString()
  if (fontIsOld || fileLocal !== `@import url("${cssFileNow}");`) {
    let cssFileNew
    if (fontIsOld) {
      print.warning('需要更新')
      const result2 = JSON.parse((await agent.post(updateUrl).send(form)).text)
      cssFileNew = `@import url("//at.alicdn.com/t/${result2.data.css_file}.css");`
    } else {
      print.error('本地与线上不一致')
      cssFileNew = `@import url("${cssFileNow}");`
    }
    fs.writeFileSync(path.resolve(__dirname, '../src/styles/scss/_iconfont.scss'), cssFileNew)
    print.success(`已更新:${cssFileNew}`)
  } else {
    print.success('不需要更新')
  }
}
main()
