import { Tabs, Tab } from '@mui/material'
import React from 'react'


interface tabNavigator {
   value: React.ReactNode;
}

function TabNavigator({value}: tabNavigator) {
   const handleChange = () => {
   }
  return (
    <Tabs
         centered
         value={value}
         onChange={handleChange}
         aria-label="wrapped label tabs example"
>
  <Tab
    value="one"
    label="Products"
 
  />
  <Tab value="two" label="Transactions" />
</Tabs>
  )
}

export default TabNavigator