// [1,2,3,4,5,...,7]
// [1,2,3,...,48,49,50]
export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  // Si el número total de páginas es 7 o menos
  // vamos a mostrar todas las páginas sin puntos suspensivos
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => (i + 1))
  }

  // Si la página actual está entre las primeras 3
  // mostrar las primeras 3 páginas, puntos suspensivos, y las últimas 3
  if (currentPage <= 3) {
    return [1,2,3,'...', totalPages-2, totalPages-1, totalPages]
  }

  // Si la página actual está entre las últimas tres páginas
  // mostrar las primeras 3, puntos suspensivos y las últimas 3 páginas
  if (currentPage >= (totalPages - 2)) {
    return [1,2,3,'...', totalPages-2, totalPages-1, totalPages]
  }

  // Si la página actual esta en otro lugar medio
  // mostrar la primera página, puntos suspensivos, la primera actual y siguientes
  return [
    1,
    '...',
    (currentPage - 1),
    currentPage,
    (currentPage + 1),
    '...',
    totalPages
  ]
}