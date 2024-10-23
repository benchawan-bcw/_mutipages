import image from '../pic/sankakuu.png'
import './Home.css'
function home() {
    return ( 
        <div className="home-container">
            <h1>CSI205 L001</h1>
            <img src={image} />
            <div className='intro'>
                <h5>66066266</h5>
                <h5>Benchawan Poolsub</h5>
                <h5>Computer Science and Software Development Innovation</h5>
                <br />
                <h5>" เขียนโค้ดสนุกจะตาย "</h5>
                <h5> " จะตายแล้วเหลือสนุก "</h5>
            </div>
        </div>
     );
}

export default home;