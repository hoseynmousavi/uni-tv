import CategoryHeader from "../containers/CategoryHeader"
import GetTextConstant from "../../modules/hooks/GetTextConstant"
import GetCategories from "../../hooks/GetCategories"
import MyLoader from "../../modules/components/MyLoader"
import ArchiveCategoryItem from "../components/ArchiveCategoryItem"
import {useState} from "react"

function ArchivePage()
{
    const {textConstant} = GetTextConstant()
    const [search, setSearch] = useState("")
    const {data, isLoading} = GetCategories()
    const showCategories = [...data].filter(item => item.title.includes(search.trim()))

    function onSearchChange({value})
    {
        setSearch(value)
    }

    return (
        <div className="archive">
            <CategoryHeader isSearch onSearchChange={onSearchChange}/>
            <h1 className="archive-title">{textConstant.categories(showCategories.length)}</h1>
            {
                isLoading ?
                    <div className="loading-cont">
                        <MyLoader width={32}/>
                    </div>
                    :
                    showCategories.map(data =>
                        <ArchiveCategoryItem key={data.id} data={data}/>,
                    )
            }
        </div>
    )
}

export default ArchivePage