import Material from "../../seyed-modules/components/Material"
import BackSvg from "../../media/svg/BackSvg"
import goBack from "../../seyed-modules/helpers/goBack"

function CategoryHeader({data})
{
    const {title} = data || {}
    return (
        <header className="category-header">
            <Material className="category-header-back" onClick={goBack}>
                <BackSvg className="category-header-back-icon"/>
            </Material>
            <h1 className="category-header-title">{title}</h1>
            <div className="category-header-back"/>
        </header>
    )
}

export default CategoryHeader