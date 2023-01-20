import GetVideoItem from "../../hooks/GetVideoItem"
import {useRef, useState} from "react"
import getVideoTime from "../../helpers/getVideoTime"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import MyLoader from "../../seyed-modules/components/MyLoader"
import CategoryVideoCart from "../components/CategoryVideoCart"
import CategoryVideoCartSkeleton from "../components/CategoryVideoCartSkeleton"
import GetVideoList from "../../hooks/GetVideoList"
import ScrollY from "../../seyed-modules/hooks/ScrollY"

function VideoPage({route: {match: {params: {videoId}}}})
{
    const [showPage, setShowPage] = useState(false)
    const {data} = GetVideoItem({id: videoId, doAfterGet})
    const {title, hits, time_create, text_summary, text_description, category_main} = data || {}
    const description = text_summary || text_description
    const contRef = useRef(null)
    const {textConstant} = GetTextConstant()
    const {data: videos, isLoading: videosLoading, getMore} = GetVideoList({category: category_main})
    const showVideos = [...videos].filter(item => item.id !== videoId)

    function doAfterGet(data)
    {
        if (data)
        {
            const {video_url} = data
            const id = video_url.split("data[rnddiv]=")[1].split("&")[0]
            const div = document.createElement("div")
            div.id = id
            div.className = "gallery-items-content-aparat"
            contRef.current.appendChild(div)
            const script = document.createElement("script")
            script.src = video_url
            script.async = true
            div.appendChild(script)
            setShowPage(true)
        }
    }

    function condition({scrollTop, scrollHeight})
    {
        if (window.innerHeight + scrollTop >= scrollHeight - 200) getMore()
    }

    ScrollY({condition, updateParams: [getMore]})

    return (
        <>
            <div className="video-player" ref={contRef}>

            </div>
            {
                !showPage ?
                    <div className="video-loading">
                        <MyLoader width={32}/>
                    </div>
                    :
                    <>
                        <div className="video-detail">
                            {hits}{textConstant.views}
                            <div className="video-detail-separator">-</div>
                            {getVideoTime({time: time_create})}
                        </div>
                        <div className="video-title">{title}</div>
                        {description && <div className="video-desc">{description}</div>}

                        <div className="video-similar-title">{textConstant.similarVideos}</div>
                        {
                            showVideos.length > 0 ?
                                showVideos.map(data =>
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
                    </>
            }
        </>
    )
}

export default VideoPage