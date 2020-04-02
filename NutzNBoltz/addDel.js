
  var list = document.querySelector("#roomList");  

  function addToList(name) 
  {
    var option = document.createElement("option");
    option.textContent = name;
    list.appendChild(option);
  }

    var rooms = JSON.parse(localStorage.getItem("rooms"))||{"Room List": ""};
    for(var room in rooms)if(rooms.hasOwnProperty(room))addToList(room);



  function saveToStorage() 
  {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }

  var current = document.querySelector("#currentnote");
  current.value = rooms[list.value];

  list.addEventListener("change", function() 
  {
    current.value = rooms[list.value];
  });
  
  current.addEventListener("change", function() 
  {
    rooms[list.value] = current.value;
    saveToStorage();
  });

  function addRoom() 
  {
    var name = document.getElementById("addRoom").value;
    if (!name) return;
    if (!rooms.hasOwnProperty(name)) 
    {
      rooms[name] = "";
      addToList(name);
      saveToStorage();
    }
    list.value = name;
    current.value = rooms[name];
  }
  
  function removeRoom() 
  {
    var index = removeRoom.selectedIndex;
    if(index > -1)
    { 
        removeRoom.remove(index);
        list.remove(index);
        saveToStorage();
    }
    else
    {
        alert("Nothing to remove");
    }
    list.value = "";
}