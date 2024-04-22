import 'react-toastify/dist/ReactToastify.css';
import { useSite } from "../context/AppContext";
import HomeProduct from "../components/HomeProduct";

export function Home() {
    const { totalPrice } = useSite()

    // const [popupVisible, setPopupVisible] = useState(false);
    // const gizle = () => {
    //     setPopupVisible(false)
    // }
    // useEffect(() => {
    //     if (popupVisible === true) {
    //         setTimeout(() => {
    //             setPopupVisible(false)
    //         }, 3000);

    //     }
    // }, [popupVisible])

    return (
    <>
        <HomeProduct />
    </>

    )
}