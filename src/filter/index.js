const filter = {
  install(Vue, option) {
    // 四舍五入，保留两位小数
    Vue.filter('toFix2', val => {
      val = String(val).trim()
      if (val === '') {
        return '0.00'
      } else if (isNaN(val)) {
        return '0.00'
      } else {
        return String(Number(val).toFixed(2))
      }
    })
    // 不四舍五入，保留两位小数
    Vue.filter('toPoint2', val => {
      val = String(val).trim()
      if (val === '') {
        return ''
      } else if (isNaN(val)) {
        return ''
      } else {
        let num3 = String(Number(val).toFixed(3))
        return num3.substring(0, num3.lastIndexOf('.') + 3)
      }
    })
    // 转换成百分比
    Vue.filter('toPercentage', val => {
      val = String(val).trim()
      if (val === '') {
        return ''
      } else if (isNaN(val)) {
        return ''
      } else {
        let num3 = String((Number(val) * 100).toFixed(3))
        return num3.substring(0, num3.lastIndexOf('.') + 3) + '%'
      }
    })
  }
}

export default filter