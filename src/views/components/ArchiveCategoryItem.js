import ArrowSvg from "../../media/svg/ArrowSvg"
import Material from "../../seyed-modules/components/Material"
import Link from "../../seyed-modules/components/Link"
import urlConstant from "../../constant/urlConstant"

function ArchiveCategoryItem({data: {id, title}})
{
    return (
        <Link to={urlConstant.category(id)}>
            <Material className="archive-category">
                <div className="archive-category-content">
                    <div className="archive-category-content-title">{title}</div>
                    <ArrowSvg className="archive-category-content-arrow"/>
                </div>
            </Material>
        </Link>
    )
}

export default ArchiveCategoryItem