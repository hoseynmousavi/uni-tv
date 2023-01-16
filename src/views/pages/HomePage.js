import GetCategories from "../../hooks/GetCategories"
import CategorySlide from "../components/CategorySlide"
import HomeHeader from "../containers/HomeHeader"
import MyLoader from "../../seyed-modules/components/MyLoader"

function HomePage()
{
    const {isLoading, data} = GetCategories()
    return (
        <>
            <HomeHeader/>
            <div className="home">
                {
                    isLoading ?
                        <div style={{marginTop: "calc((var(--full-height) - var(--header-height) - var(--nav-height) - 40px) / 2)"}}>
                            <MyLoader/>
                        </div>
                        :
                        data.map(item =>
                            <CategorySlide key={item.id} data={item}/>,
                        )
                }
            </div>
        </>
    )
}

export default HomePage