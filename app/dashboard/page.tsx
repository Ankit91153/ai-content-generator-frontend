"use client"
import React, { useState } from 'react'
import SearchSection from './_component/SearchSection'
import TemplateListSection from './_component/TemplateListSection'

const Dashboard = () => {
  const [userSearchInput,setUserSearchInput]=useState<string>("")
  return (
    <div>   
      {/* search section */}
        <SearchSection onSearchInput={(value:string)=>setUserSearchInput(value)}/>
      {/* template section */}
      <TemplateListSection userSearchInput={userSearchInput}/>
    </div>
  )
}

export default Dashboard
