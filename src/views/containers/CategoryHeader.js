import Material from "../../modules/components/Material"
import BackSvg from "../../media/svg/BackSvg"
import goBack from "../../modules/helpers/goBack"
import Input from "../components/Input"
import GetTextConstant from "../../modules/hooks/GetTextConstant"

function CategoryHeader({data, isSearch, onSearchChange})
{
    const {textConstant} = GetTextConstant()
    const {title} = data || {}
    return (
        <header className="category-header">
            {
                isSearch ?
                    <div className="category-header-back"/>
                    :
                    <Material className="category-header-back" onClick={goBack}>
                        <BackSvg className="category-header-back-icon"/>
                    </Material>
            }
            {
                isSearch && onSearchChange ?
                    <Input className="category-header-search"
                           placeholder={textConstant.searchHolder}
                           focusOnMountDesktop
                           name="search"
                           disableOnScroll
                           onChange={onSearchChange}
                    />
                    :
                    <h1 className="category-header-title">{title}</h1>
            }
            <div className="category-header-back"/>
        </header>
    )
}

export default CategoryHeader