import ImageShow from "../../seyed-modules/components/ImageShow"

function CategoryVideoCartSkeleton()
{
    return (
        <div className="category-video-cart">
            <ImageShow className="category-video-cart-image"/>
            <div className="category-video-cart-title skeleton">
                <span>‌</span>
            </div>
            <div className="category-video-cart-detail skeleton">
                <span>‌</span>
            </div>
        </div>
    )
}

export default CategoryVideoCartSkeleton