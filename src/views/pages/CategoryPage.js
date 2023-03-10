import CategoryHeader from "../containers/CategoryHeader"
import GetCategories from "../../hooks/GetCategories"
import GetVideoList from "../../hooks/GetVideoList"
import CategoryVideoCart from "../components/CategoryVideoCart"
import ScrollY from "../../modules/hooks/ScrollY"
import GetTextConstant from "../../modules/hooks/GetTextConstant"
import CategoryVideoCartSkeleton from "../components/CategoryVideoCartSkeleton"

function CategoryPage({route: {match: {params: {id}}}})
{
    const {data/*, isLoading*/} = GetCategories({id})
    const {data: videos, isLoading: videosLoading, getMore} = GetVideoList({category: id})
    const {textConstant} = GetTextConstant()

    function condition({scrollTop, scrollHeight})
    {
        if (window.innerHeight + scrollTop >= scrollHeight - 200) getMore()
    }

    ScrollY({condition, updateParams: [getMore]})

    return (
        <div className="category">
            <CategoryHeader data={data}/>
            {
                videos.length > 0 ?
                    videos.map(data =>
                        <CategoryVideoCart key={data.id} data={data}/>,
                    )
                    :
                    !videosLoading && <div className="category-not-found">{textConstant.notFound}</div>
            }
            {
                videosLoading && [0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) =>
                    <CategoryVideoCartSkeleton key={index}/>,
                )
            }
        </div>
    )
}

export default CategoryPage