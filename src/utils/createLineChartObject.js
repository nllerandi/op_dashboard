export const createLineChartObject = (arr) => {
    let lineChartObj = {}
    arr = arr.slice(0, 46)
    arr.forEach(i => {
        lineChartObj[i.completed] = i.score 
    })
    return lineChartObj
}