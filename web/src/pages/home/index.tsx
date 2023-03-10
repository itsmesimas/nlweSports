import Cards from '../../components/cards'
import Footer from '../../components/footer'
import Header from '../../components/header'

const Home = () => {
  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
			<Header />

			<Cards/>
			<Footer />
		</div>
  )
}

export default Home