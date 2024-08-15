import Image from '../assets/logo-removebg-preview.png'

function Navigation(){
    return(
        <>
    
        <div className="navigation">
        <img src={Image}  ></img>
        <ul>
         
  {/* <li style={{float:"Left"}}><a href="">  <img src={Image}  ></img></a></li> */}
  <li><a href="">HOME</a></li>
  <li><a href="">EMPLOYEE</a></li>
  <li><a href="">SETTING</a></li>
  <li><a href="">FOOTER</a></li>
  
</ul>
</div>
  
</>
    )
}
export default Navigation;