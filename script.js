const fs = require('fs');

const createLine = (img, name, type) => {
  return `('${img}','${type}','${name}'),`
}

fs.readdir('./src/img/fish', (err, files) => {
  console.log(files)

  const rows = files.map(f => {
    return createLine(f, 'Fish', f.split('.')[0])
  })

  fs.writeFile('fish.sql', rows.join('\n'), err => {
    if (err) {
      throw err
    }
    console.log('Wrote fish.sql')
  })

  // console.log(rows)
})