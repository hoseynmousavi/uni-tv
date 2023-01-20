function getVideoTime({time})
{
    const date2 = new Date()
    const date1 = new Date(new Date().getTime() - time)
    const diffTime = date1 - date2
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const intlFA = new Intl.RelativeTimeFormat("fa-ir", {numeric: "auto", style: "long"})
    return intlFA.format(diffDays, diffDays >= -30 ? "days" : "months")
}

export default getVideoTime