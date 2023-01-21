import React from "react";

const RootMenu = () => {
 const handleClickEvent = {
  routeMenu: (path: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
   console.log("wefwfe");
  },
 }

  return (
    <main className='w-full h-full'>
     <ul>
      <li>
       <button>중소기업 취업청년 소득세감면 서류 작성</button>
      </li>
     </ul>
    </main>
  )
}

export default RootMenu;