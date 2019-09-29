function commafy(num) {
  return (
    num &&
    num.toString().replace(/(\d)(?=(\d{3})+(\.)?)/g, function($1, $2, $3) {
      console.log('$1', $1)
      console.log('$2', $2)
      console.log('$3', $3)

      return $3 + ','
    })
  )
}
const str = commafy(1111111)
console.log(str)
