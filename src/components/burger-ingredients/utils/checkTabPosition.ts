export const checkTabPosition = (ingredientsTop: number, bunsTop: number, mainsTop: number, saucesTop: number) => {
  if (
    Math.abs(bunsTop - ingredientsTop) < Math.abs(mainsTop - ingredientsTop) &&
    Math.abs(bunsTop - ingredientsTop) < Math.abs(saucesTop - ingredientsTop)
  ) {
    return "bun"
  } else if (
    Math.abs(mainsTop - ingredientsTop) < Math.abs(bunsTop - ingredientsTop) &&
    Math.abs(mainsTop - ingredientsTop) < Math.abs(saucesTop - ingredientsTop)
  ) {
    return "main"
  } else if (
    Math.abs(saucesTop - ingredientsTop) < Math.abs(bunsTop - ingredientsTop) &&
    Math.abs(saucesTop - ingredientsTop) < Math.abs(mainsTop - ingredientsTop)
  ) {
    return "sauce"
  }
  return "bun"
}
