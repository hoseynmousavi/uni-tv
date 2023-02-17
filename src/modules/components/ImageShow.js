import {memo, useRef, useState} from "react"
import {createPortal} from "react-dom"
import popOnPopState from "../helpers/popOnPopState"
import goBack from "../helpers/goBack"
import onResize from "../helpers/onResize"
import ImageLoading from "./ImageLoading"
import ImageShowGesture from "../hooks/ImageShowGesture"
import getComputedStyleHelper from "../helpers/getComputedStyleHelper"

function ImageShow({className, src, alt = "", loading = "lazy", draggable = "false", style = {}, zoomable, onClick})
{
    const [showPicture, setShowPicture] = useState(null)
    const imgRef = useRef(null)
    const removeResize = useRef(null)
    const {imageBackRef, imageRef, onTouchEnd, onTouchMove, onTouchStart} = ImageShowGesture()
    const rect = useRef(null)

    function openImage(e)
    {
        e.stopPropagation()
        popOnPopState({callback: closeImage, statusBarColor: getComputedStyleHelper("--first-background-color")})
        rect.current = imgRef.current.getBoundingClientRect()
        const {top, left, width, height} = rect.current
        setShowPicture({top, left, width, height})
    }

    function openImageLoaded()
    {
        removeResize.current = onResize({
            callback: () =>
            {
                setImgPosition()
                rect.current = null
            },
        })
        setTimeout(() => imgRef.current.style.opacity = "0", 10)
        setImgPosition()
    }

    function setImgPosition()
    {
        const ratio = 0.95
        setTimeout(() =>
        {
            if (imgRef.current.naturalWidth / imgRef.current.naturalHeight > window.innerWidth / window.innerHeight)
            {
                const fullWidth = window.innerWidth * ratio
                const fullHeight = ((window.innerWidth / imgRef.current.naturalWidth) * imgRef.current.naturalHeight) * ratio
                setShowPicture({
                    top: (window.innerHeight - fullHeight) / 2,
                    left: ((1 - ratio) / 2) * window.innerWidth,
                    width: fullWidth,
                    height: fullHeight,
                    borderRadius: "40px",
                    boxShadow: "none",
                })
            }
            else
            {
                const fullWidth = ((window.innerHeight / imgRef.current.naturalHeight) * imgRef.current.naturalWidth) * ratio
                const fullHeight = window.innerHeight * ratio
                setShowPicture({
                    top: ((1 - ratio) / 2) * window.innerHeight,
                    left: (window.innerWidth - fullWidth) / 2,
                    width: fullWidth,
                    height: fullHeight,
                    borderRadius: "40px",
                    boxShadow: "none",
                })
            }
        }, 0)
    }

    function closeImage()
    {
        removeResize.current?.()
        const {top, left, width, height} = rect.current || imgRef.current.getBoundingClientRect()
        setShowPicture({isHiding: true, top, left, width, height, borderRadius: getComputedStyle(imgRef.current).getPropertyValue("border-radius"), boxShadow: getComputedStyle(imgRef.current).getPropertyValue("box-shadow")})
        setTimeout(() =>
        {
            imgRef.current.style.opacity = "1"
            setShowPicture(null)
        }, 370)
    }

    return (
        <>
            <ImageLoading key={src} className={className} style={style} loading={loading} ref={imgRef} src={src} alt={alt} draggable={draggable} onClick={zoomable ? openImage : onClick ? onClick : undefined}/>
            {
                showPicture &&
                createPortal(
                    <>
                        <div ref={imageBackRef} className={`back-cont ${showPicture.isHiding ? "hide" : ""}`} onClick={goBack}/>
                        <img className={`${className} image-show-picture`}
                             ref={imageRef}
                             onMouseDown={onTouchStart}
                             onTouchStart={onTouchStart}
                             onTouchMove={onTouchMove}
                             onTouchEnd={onTouchEnd}
                             style={{
                                 ...style,
                                 transition: "all var(--first-transition)",
                                 top: showPicture.top + "px",
                                 left: showPicture.left + "px",
                                 width: showPicture.width + "px",
                                 height: showPicture.height + "px",
                                 borderRadius: showPicture.borderRadius,
                                 ...(showPicture.boxShadow ? {boxShadow: showPicture.boxShadow} : {}),
                             }}
                             src={src}
                             alt={alt}
                             onLoad={openImageLoaded}
                             draggable="false"
                             loading="eager"
                        />
                    </>
                    , document.body)
            }
        </>
    )
}

export default memo(ImageShow)