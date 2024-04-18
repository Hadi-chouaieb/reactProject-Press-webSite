import React, { useEffect } from 'react';
import JornalCard from '../cardJornal/card';
import Lastpost from './lastpost';
import News from '../news/new';


const Home = () => {
  return ( 
    <>    

    <Lastpost/>
    
    <div className=" d-flex justify-content-center">
    <News/>
    </div>
    </>

);
};

export default Home;