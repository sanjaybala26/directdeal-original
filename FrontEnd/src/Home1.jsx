// src/Home1.js
import React, { useEffect } from 'react';
import './Home1.css';
import logo from './logo123.png';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
  
const Home1 = () => {
  useEffect(() => {
    const smoothScroll = (e) => {
      e.preventDefault();
      document.querySelector(e.target.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => anchor.addEventListener('click', smoothScroll));

    const navbar = document.querySelector('.navbar');
    const sticky = navbar.offsetTop;

    const makeNavbarSticky = () => {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
    };

    const highlightActiveSection = () => {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-links a');

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (
          window.pageYOffset >= sectionTop - 50 &&
          window.pageYOffset < sectionTop + sectionHeight - 50
        ) {
          const id = section.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    window.onscroll = () => {
      makeNavbarSticky();
      highlightActiveSection();
    };

    let opacity = 0;
    const fadeIn = setInterval(() => {
      if (opacity < 1) {
        opacity += 0.1;
        navbar.style.opacity = opacity;
      } else {
        clearInterval(fadeIn);
      }
    }, 50);

    return () => {
      window.onscroll = null;
      anchors.forEach((anchor) => anchor.removeEventListener('click', smoothScroll));
    };
  }, []);

  const navigate = useNavigate();

  const goSell = () => {
    navigate('/sell');
  };

  const goBuy = () => {
    navigate('/buy');
  };

  const goMyProducts = () => {
    navigate('/my-products');
  };
  
  const goChat = () => {
    navigate('/chat');
  };
  

  const goToProductDetail = (id) => {
    navigate(`/prod/${id}`);
  };

  const goCon = () => {
    navigate("/contact")
  }

  const goFav= () => {
    navigate("/favorites")
  }


  return (
    <div className="asas">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Frisk Scripts Logo" />
        </div>
        <ul className="nav-links">
          <div className="nav-links-left">
            <li><a href="#home">
            ℍ𝕠𝕞𝕖</a></li>
            <li><a href="#section2">𝔹𝕦𝕪 & 𝕊𝕖𝕝𝕝</a></li>
          </div>
          <div className="nav-links-right">
            
            <li><a onClick={goChat}>ℂ𝕙𝕒𝕥</a></li>
            <li><a onClick={goCon}>ℂ𝕠𝕟𝕥𝕒𝕔𝕥</a></li>
            <li><a onClick={goFav}> 𝔽𝕒𝕧𝕠𝕣𝕚𝕥𝕖𝕤</a></li>

          </div>
        </ul>
      </nav>
      <Profile />
      <section id="home" className="home">
        <div className="a">
        <div className='lottie1'>
          <dotlottie-player src="https://lottie.host/7ca247da-166d-4dd2-97ca-ca6910a00385/FiXPfpJ7Kv.json" 
            background="transparent"
            speed="1" 
            loop 
            autoplay>
          </dotlottie-player>
        </div>
        </div>
     </section>
     <div className="section2" id='section2'>

            <div className='cards'>
              <div onClick={goBuy}>
              <dotlottie-player src="https://lottie.host/4ca9149e-55b1-4995-937f-8e27318f17ee/w7PL8KGYiA.json" background="transparent" speed="1" loop autoplay></dotlottie-player>
              </div>

              <div onClick={goSell}>
              <dotlottie-player src="https://lottie.host/1e5f2bb3-b991-4cf9-982d-f35af335d00a/zmYqVY2CXO.json" background="transparent" speed="1"  loop autoplay></dotlottie-player>
              </div>

              <div onClick={goMyProducts}>

              <dotlottie-player src="https://lottie.host/33c5dc9b-e14c-4a68-969f-584ade283f37/25xM7FoNWU.json" background="transparent" speed="1" loop autoplay></dotlottie-player>
                </div>

      </div>
      </div>
    </div>
  );
};

export default Home1;
