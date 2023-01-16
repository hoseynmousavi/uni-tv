function getVideoTime({time})
{
    const diff = new Date().getDate() - new Date(new Date().getTime() - time).getDate()
    const intlFA = new Intl.RelativeTimeFormat("fa-ir", {numeric: "auto"})
    return intlFA.format(diff, "days")
}

export default getVideoTime