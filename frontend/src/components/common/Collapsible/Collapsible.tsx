import { useState } from "react";

/**
 * @summary -this component places a child component in a collapse with the 
 *          button located at the bottom of the page. This will be used for the
 *          footer       
 * @param param0 -the child element that will collapse on button click
 * @returns -either the child will be viewable or not
 */

function Collapsible({ children } : any) {
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