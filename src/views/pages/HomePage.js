import GetCategories from "../../hooks/GetCategories"
import CategorySlide from "../components/CategorySlide"
import HomeHeader from "../containers/HomeHeader"
import MyLoader from "../../modules/components/MyLoader"

function HomePage()
{
    const {isLoading, data} = GetCategories()
    return (
        <div className="home">
            <HomeHeader/>
            {
                isLoading ?
                    <div className="loading-cont">
                        <MyLoader width={32}/>
                    </div>
                    :
                    data.map(item =>
                        <CategorySlide key={item.id} data={item}/>,
                    )
            }
        </div>
    )
}

export default HomePage