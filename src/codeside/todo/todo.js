import React, { useState, useEffect} from "react";
import "./style.css";

let LocalStorageGET = ()=>{
  const newList = JSON.parse(localStorage.getItem("mytodolist"))
  if(newList){
    return newList;
  }
  else{
    return [];
  }
}


const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(LocalStorageGET());

  const addItem = () => {
    if (!inputdata) {
      alert("plz fill the data");
    }
    //  else if (inputdata && toggleButton) {
    //   setItems(
    //     items.map((curElem) => {
    //       if (curElem.id === isEditItem) {
    //         return { ...curElem, name: inputdata };
    //       }
    //       return curElem;
    //     })
    //   );

    //   setInputData("");
    //   setIsEditItem(null);
    //   setToggleButton(false);
    // } 
    else {
      let person = {
        id : new Date().getTime().toString(),
        name  : inputdata,
      };
      setItems([person, ...items]);
      setInputData("");
    }
  };

  useEffect(() => {
    localStorage.setItem("mytodolist",JSON.stringify(items))
  },[items]);

  const deleteItem = (Id)=>{
    const filterData = items.filter(cur=>{
      return cur.id !== Id;
    })
    setItems(filterData)
  }
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="paperpic" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => {
                setInputData(event.target.value);
              }}
            />
            <i className="fa fa-plus add-btn" onClick={addItem}></i>
          </div>
          {/* show items  */}
          <div className="showItems">
            {items.map((currentElement) => {
              return (
                <div className="eachItem" key={currentElement.id}>
                  <h3>{currentElement.name}</h3>
                  <div>
                    <i className="far fa-edit add-btn forPad"></i>
                    <i className="far fa-trash-alt add-btn forPad" onClick={()=>deleteItem(currentElement.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>
          {/* remove elements */}
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All">
              <span> Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
