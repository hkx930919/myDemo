const data = [
  {
    id: 1,
    name: 1,
    children: [
      {
        id: 2,
        name: 2
      },
      {
        id: 3,
        name: 3
      },
      {
        id: 4,
        name: 4,
        children: [
          {
            id: 7,
            name: 7
          },
          {
            id: 8,
            name: 8,
            children: [
              {
                id: 11,
                name: 11
              },
              {
                id: 12,
                name: 12
              },
              {
                id: 13,
                name: 13
              },
              {
                id: 14,
                name: 14
              }
            ]
          },
          {
            id: 9,
            name: 9
          },
          {
            id: 10,
            name: 10
          }
        ]
      },
      {
        id: 5,
        name: 5
      }
    ]
  }
]

const getDataById = (data, id) => {
  let value
  for (let i = 0; i < data.length; i++) {
    let val = data[i]
    if (id === val.id) {
      value = val
      break
    } else {
      if (val.children) {
        value = getDataById(val.children, id)
      }
    }
    console.log('循环', val)
  }
  return value
}

console.log('------data', getDataById(data, 3))
