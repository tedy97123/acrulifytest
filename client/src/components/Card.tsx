import { Box, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
 import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Card from '@mui/material';

interface ViewProductsCard {
   products:[];
}

const boxContainer ={
  paddingTop:"30px",
  marginLeft:'30px'
}

const line = {
  padding:'8px'
}

const CardDescriptions = (   ) => {
      const [description, setDescription] = React.useState([]);
      const {products} = useSelector((state: any) => state.rootReducer.products);

      // const {products} = useSelector((state: any) => state.rootReducer.products);
      function extractDescriptionIds(products: any) {
      const descriptionIds: any[] = [];
      try {
      products.forEach((singleId: any) => {
      descriptionIds.push(...singleId.descriptionId);
      });
      } catch (error: any) {
      console.error('Error extracting description IDs:', error.message);
      // Handle error as needed
      }
      return descriptionIds;
      } 
      const descriptionIds = extractDescriptionIds(products);
      // console.log(descriptionIds); // Output: ['65bf32800c9a3f1b44373caf', '65bf32800c9a3f1b44373cb0']

      // Transform the descriptionIds array into an object
      const descriptionIdsObject = { id: descriptionIds };
      console.log(descriptionIdsObject); // 
      extractDescriptionIds(products);
      async function sendIdsToEndpoint(descriptionIdsObject: { id: any[]; }) {
      try {
      const response = await axios.post(
      'https://desolate-wave-21722-b91d139fdee7.herokuapp.com/product/productsDescriptions',
      descriptionIdsObject, // Send the descriptionIdsObject directly as the request body
      {
      headers: {
      'Content-Type': 'application/json'
      }
      }
      );

      // If you expect a response from the endpoint, you can parse it here
      const responseData = response.data;
      // console.log('Response from endpoint:', responseData);

      return responseData; // Return the response if needed
      } catch (error:any) {
      console.error('Error sending IDs to endpoint:', error.message);
      // Handle error as needed
      }
      }
      
      // Call the function with the descriptionIdsObject
      sendIdsToEndpoint(descriptionIdsObject)
      .then(response => {
      // Handle the response here if needed
      setDescription(response )
      })
      .catch(error => {
      // Handle errors here if needed
      });
      return (
       <>  
       {description && description.map((description: any, index: any) => {
          return(
               <CardActionArea>
               <CardHeader title={description.productName}/>
               <CardMedia
                  component="img"
                  height={90}
                  width={90}
                  image={description.image}
                  alt="green iguana"
               />
               <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                     {description.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                       {description.productDescription}
                  </Typography>
               </CardContent>
               </CardActionArea>
          )
        })}  
       </>
      )
      } 
      export default CardDescriptions

 
