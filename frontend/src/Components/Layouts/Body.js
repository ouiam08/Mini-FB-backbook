import React from 'react'
import Post from '../Post'
import Article from '../Article'
import UserImage1 from './../../Assets/images/decaprio.jpg';

function Body() {
  return (
    <>
        <div className='inline-block w-screen bg-gray-200'>
           <Post/> 
           <Article 
                postOwnerImage={UserImage1}
                postOwnerName="Alfrido Decaprio" 
                postBody="Ut aut pelit ea vid untotatior seratin imperit omnihilibus endi te cones eos perchil evendion consequ assinventias dolorei cipsae in recus debis nest am nectum quam ipiciet hiliquis aribusciunt.
                Lupta diciendest unt aturiatior ad ma doles ut dolorrum volupta qui cus, officab oritibus.
                Da inimil in comnis il es a nitiunde ni ommolorerum."
                reactionNombre="33"
            />
            <Article 
                postOwnerImage={UserImage1}
                postOwnerName="Alfrido Decaprio" 
                postBody="Ut aut pelit ea vid untotatior seratin imperit omnihilibus endi te cones eos perchil evendion consequ assinventias dolorei cipsae in recus debis nest am nectum quam ipiciet hiliquis aribusciunt.
                Lupta diciendest unt aturiatior ad ma doles ut dolorrum volupta qui cus, officab oritibus.
                Da inimil in comnis il es a nitiunde ni ommolorerum."
                reactionNombre="33"
            />
        </div>
        
    </>
    
  )
}

export default Body