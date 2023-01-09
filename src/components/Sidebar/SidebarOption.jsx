import React from "react";

function SidebarOptions({refreshPage,text, Icon}) {
  return (
    <div className='flex items-center justify-center xl:justify-start text-xl space-x-3 hover:hover-effect px-4 py-2 w-fit'>
        <Icon className="sm:text-[27px]" />
        <h4 className='hidden xl:inline'>{text}</h4>
    </div>
  );
}

export default SidebarOptions;
