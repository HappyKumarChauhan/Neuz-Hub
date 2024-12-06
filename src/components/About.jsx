import React,{useEffect} from 'react'

const About = (props) => {
  useEffect(() => {
    props.setProgress(30);
  }, [])
  setTimeout(() => {
    props.setProgress(100);
  }, 100);
  return (
    <div className="container row py-4 text-light mx-auto rounded my-4 bg-gradient text-center">
            <div className="container">
                <h2 className="my-4 text-light">Developed By:</h2>
                <div className="image-container col-md-3 mx-auto">
                <img style={{borderRadius:'50%'}} width="90%" src="/images/happy.jpg" alt="developer imgae"/>
                </div>
                <h3 className="text-center text-light">Happy Kumar</h3>
                <p className="text-center text-light">(Full Stack Web Developer)</p>
                <div className="mt-3 text-center">
                    <a className="m-1" href="https://www.linkedin.com/in/happy-kumar-1773a228a/"><img width="30" src="/images/linkedin.svg" alt="LinkedIn"/></a>
                    <a className="m-1" href="https://www.facebook.com/profile.php?id=100014221995587"><img width="30" src="/images/facebook.svg" alt="Facebook"/></a>
                    <a className="m-1" href="https://www.instagram.com/iamhappychauhan/"><img width="30" src="/images/instagram.svg" alt="Instagram"/></a>
                    <a className="m-1" href="https://x.com/HappyKu11114713"><img width="30" src="/images/twitter.svg" alt="Twitter"/></a>
                </div>
            </div>
        </div>
  )
}

export default About
