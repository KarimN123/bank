import Headerbox from "@/components/Headerbox"
import TotalBalanceBox from "@/components/TotalBalanceBox"
import RightSidebar from "@/components/RightSidebar"
const Home = () => {
    const loggedIn = {firstName: "Karim", lastName:"Ndiaye", email:"karimndia010@gmail.com"};
    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <Headerbox
                        type="greeting"
                        title="welcome"
                        user={loggedIn?.firstName || 'Guest'}
                        subtext="Access and manage your account efficiently"
                    />
                    <TotalBalanceBox
                    accounts = {[]}
                    totalBanks= {1}
                    totalCurrentBalance={1250.35} 
                    />
                </header>
                RECENT TRANSACTIONS
            </div>
                <RightSidebar
                    user={loggedIn}
                    transactions={[]}
                    banks={[{currentBalance: 123.50}, {currentBalance: 500.50}]}
                />
        </section>
    )
}
export default Home