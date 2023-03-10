import Material from "../../modules/components/Material"
import GetTextConstant from "../../modules/hooks/GetTextConstant"
import ArrowSvg from "../../media/svg/ArrowSvg"
import GetVideoList from "../../hooks/GetVideoList"
import VideoRowItem from "./VideoRowItem"
import VideoRowItemSkeleton from "./VideoRowItemSkeleton"
import {useEffect, useRef, useState} from "react"
import firstView from "../../modules/helpers/firstView"
import createMaterialColor from "../../modules/helpers/createMaterialColor"
import Link from "../../modules/components/Link"
import urlConstant from "../../constant/urlConstant"

function CategorySlide({data: {title, id}})
{
    const [category, setCategory] = useState(null)
    const {textConstant} = GetTextConstant()
    const {data, isLoading} = GetVideoList({category})
    const contRef = useRef(null)
    const showSlide = !category || isLoading || data.length > 0

    useEffect(() =>
    {
        firstView({
            ref: contRef,
            callback: () => setCategory(id),
        })
        // eslint-disable-next-line
    }, [])

    return (
        <div className={`category-slide ${showSlide ? "" : "hide"}`}>
            <div className="category-slide-header" ref={contRef}>
                {
                    data.length > 0 ?
                        <div key="title" className="category-slide-header-title show">
                            {title}
                        </div>
                        :
                        <div key="skeleton" className="category-slide-header-title skeleton">
                            <span>‌</span>
                        </div>
                }
                <Link to={id && urlConstant.category(id)}>
                    <Material className="category-slide-header-btn" backgroundColor={createMaterialColor({variable: "--first-color"})}>
                        {textConstant.showAll}
                        <ArrowSvg className="category-slide-header-btn-icon"/>
                    </Material>
                </Link>
            </div>
            <div className="category-slide-content hide-scroll">
                {
                    data?.length > 0 ?
                        data.map(item =>
                            <VideoRowItem key={item.id} data={item}/>,
                        )
                        :
                        isLoading || !category ?
                            new Array(5).fill(0).map((_, index) =>
                                <VideoRowItemSkeleton key={index}/>,
                            )
                            :
                            <div className="category-slide-content-404">
                                {textConstant.notFound}
                            </div>
                }
            </div>
        </div>
    )
}

export default CategorySlide