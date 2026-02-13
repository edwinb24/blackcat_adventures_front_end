import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import HomeContent from './components/home_content/HomeContent'
import UserList from './components/UserList'

export default function HomePage() {
    return (
        <>
            <Header />
            <HomeContent />
            <UserList />
            <Footer />
        </>
    )
}
