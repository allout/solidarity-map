export const getNumRowItems = (cssSelector) => {
  const firstTop = document.querySelector(cssSelector).offsetTop

  // Sets rows to be an array of the nodes (divs) in the 1st row.
  const rows = Array.prototype.filter.call(
    document.querySelectorAll(cssSelector),
    (el) => {
      if (el.offsetTop === firstTop) return el
    }
  )

  // Return the amount of items in a row.
  console.log(rows.length)
  return rows.length
}
