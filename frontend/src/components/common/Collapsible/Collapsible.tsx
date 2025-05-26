import { useState } from "react";


function Collapsible({ children }) {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleCollapsible = () => {
      setIsOpen(!isOpen);
    };
  
    if(isOpen){
      return (
        <div>
          <button className="collapse-footer-open" onClick={toggleCollapsible}>
            ▼
          </button>
          {isOpen && <div>{children}</div>}
        </div>
      );
    } else {
      return (
        <div>
          <button className="collapse-footer-closed" onClick={toggleCollapsible}>
            ▲
          </button>
          {isOpen && <div>{children}</div>}
        </div>
      );
    }
  }
  
  export default Collapsible;