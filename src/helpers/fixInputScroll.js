import checkOs from "../modules/helpers/checkOs"
import getMainRender from "../modules/helpers/getMainRender"

function fixInputScroll({inputRef, halfHeight = 40})
{
    if (checkOs() === "android")
    {
        return setTimeout(() =>
        {
            const root = getMainRender()
            const rect = inputRef.current.getBoundingClientRect()
            const should = root.clientHeight / 2
            const scroll = root.scrollTop
            const now = rect.top
            root.scrollTo({top: scroll - (should - now - halfHeight), behavior: "smooth"})
        }, 800)
    }
    else return null
}

export default fixInputScroll