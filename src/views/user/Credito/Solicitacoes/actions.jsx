export const shortten = (str) => {
  return str.length > 30 ? str.substring(0, 30) + '...' : str
}

export const joinObras = (musc) => {
  let concat = ''
  musc.length > 0 && musc.map( msc => 
    concat += msc.titulo + ', '
  ) 
  return concat.toLowerCase()
}